import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import ExpandedNavbar from './ExpandedNavbar';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [navbarExpanded, setNavbarExpanded] = useState(false);

  const handleResize = () => {
    setNavbarExpanded(window.innerWidth >= 768);
  }

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    setNavbarExpanded(window.innerWidth >= 768);
  }, []);

  return (
    <div className="header-container">{navbarExpanded ? <ExpandedNavbar user={user} setUser={setUser} navigate={navigate} /> : <MobileNavbar user={user} setUser={setUser} navigate={navigate} />}</div>
  )
}

export default Header;