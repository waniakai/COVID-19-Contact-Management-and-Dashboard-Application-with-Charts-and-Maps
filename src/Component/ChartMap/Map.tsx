import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet'; // Import leaflet
// Import the custom marker icon images
import markerIcon from './coro.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


type CountryData = {
  country: string;
  cases: number;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
    iso2: string;
    // Add other properties if necessary
  };
};


const Map: React.FC = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  // Fetch country-specific data
  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
  }, []);

  // Create a custom icon
  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
  });

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <h2 className='font-bold text-2xl'>COVID-19 Global Impact Map</h2>
      <MapContainer
        center={[51.505, -0.09]} // Replace with your initial latitude and longitude
        zoom={2} // Adjust the initial zoom level as needed
        style={{ height: '600px', width: '100%' }} // Set a height for the map container
        zoomControl={false} // Disable default zoom control
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="topright" /> {/* Position the zoom control on the top right */}

        {/* Render markers with popups */}
        {countryData.map((country) => (
          <Marker
            key={country.countryInfo.iso2}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={customIcon} // Use the custom icon for the marker
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Total Cases: {country.cases}</p>
                <p>Active Cases: {country.active}</p>
                <p>Recovered Cases: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
