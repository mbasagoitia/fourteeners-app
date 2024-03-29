import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import handleLogout from '../helpers/handleLogout';
import logo from '../ss-logo.png';

const NavDrawer = ({ user, setUser, navigate, handleDrawerClose, className }) => {
  
    const NavLink = ({ to, title, className }) => {
      return <Nav.Link className={`${className} expNavLink`} as={Link} to={to} onClick={handleDrawerClose}>{title}</Nav.Link>
    }

    return (
      <div className={`nav-drawer ${className} w-100`} onMouseLeave={handleDrawerClose}>
        <div className="nav-drawer-content w-100 d-flex justify-content-evenly">
          <div>
            <img src={logo} alt="Summit Selector Logo" id="logo" />
          </div>
          <div>
              <NavLink to="/summit-selector" title="14er Summit Selector" />
              <NavLink to="/provide-feedback" title="Rate/Review the Tool" className="no-border" />
          </div>
          <div>
              <NavLink to="/mountain-classification-guide" title="Mountain Classification Guide" />
              <NavLink to="/mountain-ranges" title="Mountain Ranges of Colorado" />
              <NavLink to="/mountain-safety" title="Mountain Safety" />
              <NavLink to="/browse-all-peaks" title="Browse All Peaks" className="no-border" />
          </div>
          <div>
          {user ? (
          <>
          <NavLink to="/my-list" title="My List" />
          <NavLink to="/manage-account" title="Manage Account" />
          {user.isAdmin ? <NavLink to={"/admin-panel"} title={"Admin Panel"} /> : null}
          <NavDropdown.Divider />
          <Nav.Link as={Link} className="expNavLink no-border" onClick={() => {
              handleLogout(setUser, navigate);
              handleDrawerClose();
          }}>Log Out</Nav.Link>
          </>
          ) : (
          <>
          <NavLink to="/login" title="Log In" />
          <NavDropdown.Divider />
          <NavLink to="/register" title="Register" className="no-border" />
          </>
          )}
          </div>
      </div>
  </div>
    );
}

export default NavDrawer;