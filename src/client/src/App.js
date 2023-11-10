import './App.css';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/recommendations' Component={Recommendations} />
        <Route path='/login' Component={Login} />
        <Route path='/create-account' Component={CreateAccount} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
