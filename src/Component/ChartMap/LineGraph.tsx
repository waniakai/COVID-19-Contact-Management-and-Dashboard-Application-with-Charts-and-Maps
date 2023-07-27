import React, { useEffect, useRef } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import axios from 'axios';

const LineGraph: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<'line', number[], string> | null>(null); // Explicitly define the Chart type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        const historicalData = response.data;
        const dates = Object.keys(historicalData.cases);
        const cases = Object.values(historicalData.cases) as number[]; // Assert data type to 'number[]'

        // Update the data object for Chart.js
        const data: ChartData<'line', number[], string> = {
          labels: dates,
          datasets: [
            {
              label: 'Worldwide COVID-19 Cases',
              data: cases,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              fill: true,
            },
          ],
        };

        // Destroy previous Chart.js instance if exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create the line graph
        const lineChart = new Chart(chartRef.current!, { // Add '!' to assert that chartRef.current is not null
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
          } as ChartOptions<'line'>, // Explicitly define the ChartOptions type
        });

        // Save the Chart.js instance to the ref
        chartInstanceRef.current = lineChart;

        // Resize chart when window size changes
        const handleResize = () => {
          lineChart.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          // Destroy Chart.js instance on unmount
          lineChart.destroy();
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div  className='border-2 p-2 mb-4 font-bold text-2xl'>
      <h2>Worldwide COVID-19 Cases</h2>
      <canvas ref={chartRef} style={{ width: '50%', height: '300px', maxHeight: '50vh' }}></canvas>
    </div>
  );
};

export default LineGraph;
