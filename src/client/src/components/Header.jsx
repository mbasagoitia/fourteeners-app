import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import ExpandedNavbar from './ExpandedNavbar';

const Header = ({ user, setUser, isAdmin }) => {
  const navigate = useNavigate();

  const [navbarExpanded, setNavbarExpanded] = useState(false);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    setNavbarExpanded(screenWidth >= 768);

    const handleResize = () => {
      setNavbarExpanded(window.innerWidth >= 768);
    }
  
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  return (
    <div className="header-container">{navbarExpanded ? <ExpandedNavbar user={user} setUser={setUser} navigate={navigate} isAdmin={isAdmin} /> : <MobileNavbar user={user} setUser={setUser} navigate={navigate} isAdmin={isAdmin} />}</div>
  )
}

export default Header;