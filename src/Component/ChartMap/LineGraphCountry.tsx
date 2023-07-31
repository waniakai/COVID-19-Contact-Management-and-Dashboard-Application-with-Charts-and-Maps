import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import axios from 'axios';

const LineGraphCountryCode: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<'line', number[], string> | null>(null);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=all`);
        const historicalData = response.data.timeline;
        const dates = Object.keys(historicalData.cases);
        const cases = Object.values(historicalData.cases) as number[];

        const data: ChartData<'line', number[], string> = {
          labels: dates,
          datasets: [
            {
              label: selectedCountry === 'all' ? 'Choose Country COVID-19 Cases' : `COVID-19 Cases in ${selectedCountry}`,
              data: cases,
              borderColor: selectedCountry === 'all' ? 'rgba(75, 192, 192, 1)' : 'rgba(192, 75, 75, 1)',
              backgroundColor: selectedCountry === 'all' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(192, 75, 75, 0.2)',
              borderWidth: 2,
              fill: true,
            },
          ],
        };

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const lineChart = new Chart(chartRef.current!, {
          type: 'line',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
              },
              y: {
                display: true,
              },
            },
          } as ChartOptions<'line'>,
        });

        chartInstanceRef.current = lineChart;

        const handleResize = () => {
          lineChart.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          lineChart.destroy();
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/countries');
        setCountryData(response.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountriesData();
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className='border-2 p-2 font-bold '>
      <h2 className='text-2xl'>COVID-19 Impact by Country</h2>
      <select className='border-2 rounded-3xl' value={selectedCountry} onChange={handleCountryChange}>
        <option value="all">Choose Country</option>
        {countryData.map((country: any) => (
          <option key={country.country} value={country.country}>
            {country.country}
          </option>
        ))}
      </select>
      <canvas ref={chartRef} style={{ width: '50%', height: '300px', maxHeight: '50vh' }}></canvas>
    </div>
  );
};

export default LineGraphCountryCode;
