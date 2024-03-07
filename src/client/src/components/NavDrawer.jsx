import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import handleLogout from '../helpers/handleLogout';

const NavDrawer = ({ user, setUser, navigate, handleDrawerClose, className }) => {
  
    const NavLink = ({to, title, className}) => {
      return <Nav.Link className={`${className} expNavLink`} as={Link} to={to} onClick={handleDrawerClose}>{title}</Nav.Link>
    }

    const homeSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/></svg>';

    return (
      <div className={`nav-drawer ${className} w-100`} onMouseLeave={handleDrawerClose}>
        <div className="nav-drawer-content w-100 d-flex justify-content-evenly">
          <div className="hidden">
            <Nav.Link as={Link} to="/" dangerouslySetInnerHTML={{ __html: homeSvgIcon }} />
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
          <NavDropdown.Divider />
          <Nav.Link as={Link} className="expNavLink mt-4 no-border" onClick={() => {
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