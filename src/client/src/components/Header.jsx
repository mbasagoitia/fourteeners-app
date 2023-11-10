import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

function Header () {
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
                    <Nav.Link>Login</Nav.Link>
                    <Nav.Link>My List</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                </Container>    
        </Navbar>
    )
}

export default Header;