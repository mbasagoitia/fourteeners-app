import './App.css';
import { useState } from "react";
import Header from './components/Header';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recommendations' element={<Recommendations />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
