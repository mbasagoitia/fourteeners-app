import './App.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BackgroundImage from './components/BackgroundImage';
import Header from './components/Header';
import Home from './pages/Home';
import SummitSelector from './pages/SummitSelector';
import MountainClassificationGuide from './pages/MountainClassificationGuide';
import MountainRanges from './pages/MountainRanges';
import MountainSafety from './pages/MountainSafety';
import BrowseAllPeaks from './pages/BrowseAllPeaks';
import Recommendations from './pages/Recommendations';
import Register from './pages/Register';
import Login from './pages/Login';
import ManageAccount from './pages/ManageAccount';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import ResetPassword from './pages/ResetPassword';
import CreateNewPassword from './pages/CreateNewPassword';
import UserList from './pages/UserList';
import FeedbackForm from './pages/FeedbackForm';
import { Route, Routes } from 'react-router-dom';
import fetchUserData from './helpers/fetchUserData';
import fetchAllPeaks from './helpers/fetchAllPeaks';

function App() {

  const [user, setUser] = useState(null);
  const [allPeaks, setAllPeaks] = useState([]);
  const [intendedRoute, setIntendedRoute] = useState(null);

  const navigate = useNavigate();

  const handleLoginRedirect = (path) => {
    setIntendedRoute(path);
    navigate('/login');
  };

  useEffect(() => {
    // Fetch user data (if any) and all peaks
    const fetchData = async () => {
      try {
        const [userData, peaksData] = await Promise.all([
          fetchUserData(),
          fetchAllPeaks(),
        ]);

        setUser(userData);
        setAllPeaks(peaksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <Header user={user} setUser={setUser} />
      <BackgroundImage />
      <div className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mountain-classification-guide' element={<MountainClassificationGuide />} />
          <Route path='/mountain-ranges' element={<MountainRanges />} />
          <Route path='/mountain-safety' element={<MountainSafety />} />
          <Route path='/browse-all-peaks' element={<BrowseAllPeaks peaks={allPeaks} />} />
          <Route path='/recommendations' element={<Recommendations />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login user={user} setUser={setUser} onLoginRedirect={() => navigate(intendedRoute || '/')} />} />
          <Route path="/manage-account" element={<ManageAccount user={user} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
         {/* The following routes are "private" routes not accessible to anyone who visits the page.
          If nobody is logged in, they will be redirected to the login page and then
          back to the intended route upon successful login. */}
          <Route 
            path='/summit-selector' element={<SummitSelector user={user} onLoginRedirect={() => handleLoginRedirect('/summit-selector')} />} />
          <Route
            path="/my-list"
            element={<UserList user={user} peaks={allPeaks} onLoginRedirect={() => handleLoginRedirect('/my-list')} />}
          />
          <Route
            path="/provide-feedback"
            element={<FeedbackForm user={user} peaks={allPeaks} onLoginRedirect={() => handleLoginRedirect('/provide-feedback')} />}
          />
          <Route
            path="/admin-panel"
            element={<AdminPanel user={user} peaks={allPeaks} onLoginRedirect={() => handleLoginRedirect('/admin-panel')} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
