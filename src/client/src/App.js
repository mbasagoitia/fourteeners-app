import './App.css';
import Home from './pages/Home';
import UserForm from './components/UserForm';
import { useState, useEffect } from 'react';

function App() {

  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/api-key")
    .then((res) => res.json())
    .then((data) => {
      setApiKey(data.apiKey);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching API key:", err);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      {/* <Home /> */}
      <UserForm apiKey={apiKey} />
    </div>
  );
}

export default App;
