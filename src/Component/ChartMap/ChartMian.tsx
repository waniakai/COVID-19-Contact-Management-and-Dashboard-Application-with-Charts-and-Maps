import React from 'react';
import LineGraph from './LineGraph';
import Map from './Map';
import LineGraphCountryCode from './LineGraphCountry';

const ChartMain: React.FC = () => {
  return (
    <div className='mt-8 ml-4 md:ml-40 flex flex-col z-10'> 
      <h1 className='text-2xl md:ml-20 font-bold text-4xl'>Chart And Map</h1> 
      <div className='mt-4 md:ml-20'>
        <LineGraph />
        <LineGraphCountryCode />
      </div>
      <div className='mt-4 mr-2 md:ml-20 mb-8 relative z-0'>
        <Map />
      </div>
      <div className='h-20'>

      </div>
    </div>
  );
};

export default ChartMain;
