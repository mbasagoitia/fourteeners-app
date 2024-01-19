import './App.css';
import { useState, useEffect } from "react";
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
import ResetPassword from './pages/ResetPassword';
import CreateNewPassword from './pages/CreateNewPassword';
import UserList from './pages/UserList';
import FeedbackForm from './pages/FeedbackForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import fetchUserData from './helpers/fetchUserData';

function App() {

  const [user, setUser] = useState(null);
  const [allPeaks, setAllPeaks] = useState([]);

  useEffect(() => {
    // Fetch user data and all peaks together
    const fetchData = async () => {
      try {
        const [userData, peaksData] = await Promise.all([
          fetchUserData(),
          fetch('http://localhost:5000/allPeaks', {
            method: 'GET',
            credentials: 'include',
          })
            .then((response) => response.json())
            .then((data) => data.allPeaks),
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
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/summit-selector' element={<SummitSelector />} />
        <Route path='/mountain-classification-guide' element={<MountainClassificationGuide />} />
        <Route path='/mountain-ranges' element={<MountainRanges />} />
        <Route path='/mountain-safety' element={<MountainSafety />} />
        <Route path='/browse-all-peaks' element={<BrowseAllPeaks peaks={allPeaks} />} />
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login user={user} setUser={setUser} />} />
        <Route path='/manage-account' element={<ManageAccount user={user} setUser={setUser} />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/create-new-password' element={<CreateNewPassword />} />
        <Route path='/my-list' element={<UserList user={user} peaks={allPeaks} />} />
        <Route path='/provide-feedback' element={<FeedbackForm user={user} peaks={allPeaks} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
