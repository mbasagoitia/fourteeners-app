import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import handleLogout from '../helpers/handleLogout';

const MobileNavbar = ({ user, setUser, navigate }) => {

    const [navOpen, setNavOpen] = useState(false);

    const handleNavItemClick = () => {
        setNavOpen(false);
      };
    
      const handleNavToggle = () => {
        setNavOpen(!navOpen);
      }

    const NavDropdownItem = ({to, title}) => {
        return <NavDropdown.Item as={Link} to={to} onClick={handleNavItemClick}>{title}</NavDropdown.Item>
    }

    const homeSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/></svg>';
    const userSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>';

    return (
        <Navbar
      expand="md"
      expanded={navOpen}
      className={`sticky-top navbar-dark header ${navOpen ? 'navbar-open' : ''}`}
      style={{ transition: 'background-color 0.5s ease' }}
    >
          <Navbar.Toggle onClick={handleNavToggle} aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 d-flex justify-content-evenly flex-wrap">  
          <Nav.Link as={Link} to="/" dangerouslySetInnerHTML={{ __html: homeSvgIcon }} onClick={handleNavItemClick} />
              <NavDropdown title="Summit Selector" id="selector-tool-dropdown">
                <NavDropdownItem to={"/summit-selector"} title={"14er Summit Selector"} />
                <NavDropdownItem to={"/provide-feedback"} title={"Rate/Review the Tool"} />
              </NavDropdown>
              <NavDropdown title="Mountain Information" id="mountain-info-dropdown">
                <NavDropdownItem to={"/mountain-classification-guide"} title={"Mountain Classification Guide"} />
                <NavDropdownItem to={"/mountain-ranges"} title={"Mountain Ranges of Colorado"} />
                <NavDropdownItem to={"/mountain-safety"} title={"Mountain Safety"} />
                <NavDropdownItem to={"/browse-all-peaks"} title={"Browse All Peaks"} />
              </NavDropdown>
              <NavDropdown title={<span dangerouslySetInnerHTML={{ __html: userSvgIcon }} />} id="user-dropdown">
              {user ? (
              <>
              <NavDropdownItem to={"/my-list"} title={"My List"} />
              <NavDropdownItem to={"/manage-account"} title={"Manage Account"} />
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} onClick={() => {
                handleLogout(setUser, navigate);
                handleNavItemClick();
              }}>Log Out</NavDropdown.Item>
              </>
              ) : (
              <>
              <NavDropdownItem to={"/login"} title={"Log In"} />
              <NavDropdown.Divider />
              <NavDropdownItem to={"/register"} title={"Register"} />
              </>
              )}
              </NavDropdown>
          </Nav>
          </Navbar.Collapse>  
        </Navbar>
    )
}

export default MobileNavbar;