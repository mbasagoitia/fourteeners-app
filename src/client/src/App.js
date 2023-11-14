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

  return (
    <BrowserRouter>
      <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} setUser={setUser} />} />
        <Route path='/my-list' element={<UserList authenticated={authenticated} setAuthenticated={setAuthenticated} user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
