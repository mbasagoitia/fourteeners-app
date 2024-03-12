import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDrawer from './NavDrawer';
import { FaHome, FaUser, FaCaretDown } from 'react-icons/fa';

const ExpandedNavbar = ({ user, setUser, navigate }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    
    const handleLinkHover = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
        <Navbar
          expand="md"
          className={`sticky-top navbar-dark header d-flex justify-content-evenly ${isDrawerOpen ? "black-bg" : ""}`}
          style={{ transition: 'background-color 0.5s ease' }}
        >
        <Nav.Link className="expNavLinkTitle" as={Link} to="/" ><FaHome size={20} /></Nav.Link>
        <p className="expNavLinkTitle" onMouseEnter={handleLinkHover}>Summit Selector<span className="caret-icon"><FaCaretDown size={20} /></span></p>
        <p className="expNavLinkTitle" onMouseEnter={handleLinkHover}>Mountain Information<span className="caret-icon"><FaCaretDown size={20} /></span></p>
        <p className="expNavLinkTitle" onMouseEnter={handleLinkHover}><FaUser size={20} /><span className="caret-icon"><FaCaretDown size={20} /></span></p>
        </Navbar>
        <div className={`nav-drawer ${isDrawerOpen ? "nav-drawer-open" : "nav-drawer-closed"} w-100`} onMouseLeave={handleDrawerClose}>
            {isDrawerOpen && <NavDrawer user={user} setUser={setUser} navigate={navigate} handleDrawerClose={handleDrawerClose} />}
        </div>
        </>
    )

}

export default ExpandedNavbar;