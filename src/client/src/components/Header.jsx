import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

function Header ({ authenticated, setAuthenticated }) {
    const handleLogout = async () => {
        try {
          const response = await fetch('http://localhost:5000/logout', {
            method: 'GET',
          });

          const data = response.json();
          
          if (response.ok) {
            console.log("Logged out");
            setAuthenticated(false);
          } else {
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
    };

    return (
        <Navbar expand="sm" className="sticky-top navbar-dark">
            <Container fluid className="m-0 w-100 text-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 d-flex justify-content-evenly flex-wrap">  
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Informational Guide</Nav.Link>
                    <Nav.Link>Mountain Ranges of Colorado</Nav.Link>
                    <Nav.Link>Mountain Safety</Nav.Link>
                    {authenticated ? (
                    <>
                    <Nav.Link href="my-list">My List</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                    </>
                    ) : (
                    <Nav.Link href="/login">Log In</Nav.Link>
                    )}
                </Nav>
                </Navbar.Collapse>
                </Container>    
        </Navbar>
    )
}

export default Header;