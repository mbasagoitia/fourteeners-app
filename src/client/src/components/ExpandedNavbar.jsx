import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDrawer from './NavDrawer';

const ExpandedNavbar = ({ user, setUser, navigate }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    
    const handleLinkHover = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const homeSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/></svg>';
    const userSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>';
    const caretSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';
    return (
        <>
        <Navbar
          expand="md"
          className={`sticky-top navbar-dark header d-flex justify-content-evenly ${isDrawerOpen ? "black-bg" : ""}`}
          style={{ transition: 'background-color 0.5s ease' }}
        >
        <Nav.Link className="expNavLinkTitle" as={Link} to="/" dangerouslySetInnerHTML={{ __html: homeSvgIcon }} />
        <p className="expNavLinkTitle" onMouseEnter={handleLinkHover}>Summit Selector<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-2" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg></p>
        <p className="expNavLinkTitle" onMouseEnter={handleLinkHover}>Mountain Information<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-2" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg></p>
        <p className="expNavLinkTitle" onMouseEnter={handleLinkHover} dangerouslySetInnerHTML={{ __html: userSvgIcon }} />
        </Navbar>
        <div className={`nav-drawer ${isDrawerOpen ? "nav-drawer-open" : "nav-drawer-closed"} w-100`} onMouseLeave={handleDrawerClose}>
            {isDrawerOpen && <NavDrawer user={user} setUser={setUser} navigate={navigate} handleDrawerClose={handleDrawerClose} />}
        </div>
        </>
    )

}

export default ExpandedNavbar;