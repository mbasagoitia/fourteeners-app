import './App.css';
import { useState, useEffect } from "react";
import Header from './components/Header';
import Home from './pages/Home';
import SummitSelector from './pages/SummitSelector';
import MountainClassificationGuide from './pages/MountainClassificationGuide';
import MountainRanges from './pages/MountainRanges';
import MountainSafety from './pages/MountainSafety';
import Recommendations from './pages/Recommendations';
import Register from './pages/Register';
import Login from './pages/Login';
import UserList from './pages/UserList';
import FeedbackForm from './pages/FeedbackForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getUser', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          // Again, authenticated state is redundant. Remove it.
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    fetchUserData();
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
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login user={user} setUser={setUser} />} />
        <Route path='/my-list' element={<UserList user={user} />} />
        <Route path='provide-feedback' element={<FeedbackForm user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
