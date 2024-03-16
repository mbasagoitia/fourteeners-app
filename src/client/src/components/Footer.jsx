import { useState } from "react";
import TermsOfUse from "./TermsOfUse";

const Footer = () => {

    const [termsOfUseOpen, setTermsOfUseOpen] = useState(false);

    const showTermsOfUse = () => {
        setTermsOfUseOpen(true);
    }

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
            <a href="#" onClick={showTermsOfUse}>Terms of Use</a> | <a href="/safety-disclaimer">Safety Disclaimer</a>
          </p>
        </div>
        <div className="copyright mt-4">
            Copyright © 2024 Marika Basagoitia
        </div>
      </div>
      {termsOfUseOpen && (
        <div className="overlay">
            <TermsOfUse setTermsOfUseOpen={setTermsOfUseOpen} />
        </div>
      )}
    </footer>
  );
};

export default Footer;
