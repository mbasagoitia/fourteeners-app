import './App.css';
import Home from './pages/Home';
import Recommendationss from './pages/Recommendations';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' Component={Home} />
        <Route path='/recommendations' Component={Recommendationss} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
