import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SafetyDisclaimerLink = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scrollToDisclaimer = () => {
      const disclaimerDiv = document.getElementById('disclaimer');
      if (disclaimerDiv) {
        disclaimerDiv.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (window.location.hash === '#disclaimer') {
      scrollToDisclaimer();
    }
  }, []);

  const handleClick = () => {
    navigate('/mountain-safety#disclaimer');
  };

  return (
    <a href="/mountain-safety#disclaimer" onClick={handleClick}>Safety Disclaimer</a>
  );
};

export default SafetyDisclaimerLink;
