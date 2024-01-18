import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Header ({ user, setUser }) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          const response = await fetch('http://localhost:5000/logout', {
            method: 'GET',
          });

          const data = response.json();
          
          if (response.ok) {
            console.log("Logged out");
            setUser(null);
            navigate("/");
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
    };

    const homeSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/></svg>';
    const userSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>';

    return (
        <Navbar expand="md" className="sticky-top navbar-dark">
            <Container fluid className="m-0 w-100 text-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 d-flex justify-content-evenly flex-wrap">  
                <Nav.Link as={Link} to="/" dangerouslySetInnerHTML={{ __html: homeSvgIcon }} />
                    <NavDropdown title="Summit Selector" id="selector-tool-dropdown">
                      <NavDropdown.Item as={Link} to={"/summit-selector"}>14er Summit Selector</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={"/provide-feedback"}>Rate/Review the Tool</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Mountain Information" id="mountain-info-dropdown">
                      <NavDropdown.Item as={Link} to={"/mountain-classification-guide"}>Mountain Classification Guide</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={"/mountain-ranges"}>Mountain Ranges of Colorado</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={"/mountain-safety"}>Mountain Safety</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to={"/browse-all-peaks"}>Browse All Peaks</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={<span dangerouslySetInnerHTML={{ __html: userSvgIcon }} />} id="user-dropdown">
                    {user ? (
                    <>
                    <NavDropdown.Item as={Link} to="/my-list">My List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/manage-account">Manage Account</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} onClick={handleLogout}>Log Out</NavDropdown.Item>
                    </>
                    ) : (
                    <>
                    <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                    </>
                    )}
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
                </Container>    
        </Navbar>
    )
}

export default Header;