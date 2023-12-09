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

    return (
        <Navbar expand="md" className="sticky-top navbar-dark">
            <Container fluid className="m-0 w-100 text-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 d-flex justify-content-evenly flex-wrap">  
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to={"/mountain-classification-guide"}>Mountain Classification Guide</Nav.Link>
                    <Nav.Link as={Link} to={"/mountain-ranges"}>Mountain Ranges of Colorado</Nav.Link>
                    <Nav.Link as={Link} to={"/mountain-safety"}>Mountain Safety</Nav.Link>
                    {user ? (
                    <>
                    <Nav.Link as={Link} to="/my-list">My List</Nav.Link>
                    <Nav.Link as={Link} onClick={handleLogout}>Log Out</Nav.Link>
                    </>
                    ) : (
                    <>
                    {/* You will want to perhaps organize this into a dropdown menu for better UI */}
                    <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </>
                    )}
                </Nav>
                </Navbar.Collapse>
                </Container>    
        </Navbar>
    )
}

export default Header;