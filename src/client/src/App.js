import './App.css';
import { useState, useEffect } from "react";
import Header from './components/Header';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import Register from './pages/Register';
import Login from './pages/Login';
import UserList from './pages/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [authenticated, setAuthenticated] = useState(false);
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
          setAuthenticated(true);
        } else {
          setUser(null);
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
        setAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <BrowserRouter>
      <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} setUser={setUser} user={user} />} />
        <Route path='/my-list' element={<UserList authenticated={authenticated} setAuthenticated={setAuthenticated} user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
