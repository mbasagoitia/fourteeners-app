import React from 'react';

const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="acknowledgements">
          <p>
            Summit Selector uses data from <a href="https://developers.google.com/maps">Google Maps API</a>, <a href="https://openweathermap.org/api">OpenWeather API</a>, and peak-specific information from <a href="https://www.14ers.com/">14ers.com</a>.
          </p>
        </div>
        <div className="terms mt-2">
          <p>
            Terms of Use | <a href="/safety-disclaimer">Safety Disclaimer</a>
          </p>
        </div>
        <div className="copyright mt-4">
            Copyright © 2024 Marika Basagoitia
        </div>
      </div>
    </footer>
  );
};

export default Footer;
