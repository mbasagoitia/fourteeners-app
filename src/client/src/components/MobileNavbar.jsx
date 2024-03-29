import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import handleLogout from '../helpers/handleLogout';
import { FaHome, FaUser } from 'react-icons/fa';

const MobileNavbar = ({ user, setUser, navigate }) => {

    const [navOpen, setNavOpen] = useState(false);

    const handleNavItemClick = () => {
        setNavOpen(false);
      };
    
      const handleNavToggle = () => {
        setNavOpen(!navOpen);
      }

    const NavDropdownItem = ({ to, title }) => {
        return <NavDropdown.Item as={Link} to={to} onClick={handleNavItemClick}>{title}</NavDropdown.Item>
    }

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
          <Nav.Link as={Link} to="/" onClick={handleNavItemClick}><FaHome size={20} /></Nav.Link>
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
              <NavDropdown title={<FaUser size={15} />} id="user-dropdown">
              {user ? (
              <>
              <NavDropdownItem to={"/my-list"} title={"My List"} />
              <NavDropdownItem to={"/manage-account"} title={"Manage Account"} />
              {user.isAdmin ? <NavDropdownItem to={"/admin-panel"} title={"Admin Panel"} /> : null}
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