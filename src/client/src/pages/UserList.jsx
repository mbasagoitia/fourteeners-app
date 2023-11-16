// If logged in, a list of peaks that the user has already climbed
// Option to check off, view completed peaks (greyed out list with completed ones in color?)
// Option to leave review for each route/peak

import {useState, useEffect} from "react";

function UserList({ user }) {

    const [completedPeaks, setCompletedPeaks] = useState([]);
    const [newCompletedPeaks, setNewCompletedPeaks] = useState([]);
    const [peaksToUpdate, setPeaksToUpdate] = useState([]);
    const [peaksToDelete, setPeaksToDelete] = useState([]);

    useEffect(() => {
        const fetchCompletedPeaks = async () => {
          try {
            const response = await fetch('http://localhost:5000/completedPeaks', {
              method: 'GET',
              credentials: 'include',
            });
    
            if (response.ok) {
              const data = await response.json();
              setCompletedPeaks(data.completedPeaks);
            } else {
              setCompletedPeaks(null);
            }
          } catch (error) {
            console.error('Error fetching peaks:', error);
            setCompletedPeaks(null);
          }
        };
    
        fetchCompletedPeaks();
      }, [user, newCompletedPeaks]);

    const addCompletedPeaks = async () => {
    try {
        const response = await fetch('http://localhost:5000/completedPeaks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        credentials: 'include',
        body: JSON.stringify(newCompletedPeaks),
        });

        if (response.ok) {
        const data = await response.json();
        console.log("Peaks added to list");
        setNewCompletedPeaks([]);
        } else {
            console.log("Error adding peaks to list")
        }
    } catch (error) {
        console.error('Error adding new peaks:', error);
    }
    };
  
    return (
      <>
        {user ? <h1>Hello, {user.username}!</h1> : null}
      </>
    );
  }
  
  export default UserList;