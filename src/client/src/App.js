import './App.css';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={<Home />} />
        <Route path='/recommendations' Component={<Recommendations />} />
        <Route path='/register' Component={<Register />} />
        <Route path='/login' Component={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
