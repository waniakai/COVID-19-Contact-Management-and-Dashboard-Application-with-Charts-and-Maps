import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import ContactForm from './Component/ContactForm';
import ChartMap from './Component/ChartMap/ChartMian'; // Import the ChartMap component instead of ContactView
// Import other components or pages as needed

const App: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileView) {
      setShowAlert(true);
    }
  }, [isMobileView]);

  const handleRefresh = () => {
    setShowAlert(false);
    window.location.reload();
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header /> {/* Include the Header */}
        <div className="flex flex-1">
          <Sidebar /> {/* Include the Sidebar */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Add a wrapper div to center its contents */}
            <div className={`flex pt-16 items-center justify-center h-full ${isMobileView ? 'text-center' : ''}`}>
              <div className="w-full sm:px-10 md:px-20 py-2"> {/* Updated padding on small screens */}
                {/* Use Routes component to define your routing */}
                <Routes>
                  {/* Use the 'element' child prop inside the Route */}
                  <Route path="/contacts" element={<ContactForm />} />
                  <Route path="/chartandmap" element={<ChartMap />} /> {/* Use the ChartMap component */}
                  {/* Define other routes here */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
