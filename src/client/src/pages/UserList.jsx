// If logged in, a list of peaks that the user has already climbed
// Option to check off, view completed peaks (greyed out list with completed ones in color?)
// Option to leave review for each route/peak

import {useState, useEffect} from "react";

function UserList({ user }) {

    const [completedPeaks, setCompletedPeaks] = useState([]);

    // Will be an array of objects with properties peak_id and date_completed
    // Add new peaks to the list when the user uses the interface to add new peaks
    const [newCompletedPeaks, setNewCompletedPeaks] = useState([]);

    // Will be an array of objects with properties peak_id and date_completed
    // Add new peaks to the list when user updates the date completed on any of their current list
    const [peaksToUpdate, setPeaksToUpdate] = useState([]);

    // Will be an array of peak_ids
    // Add new peaks to the list when the user deletes a peak from their current list
    const [peaksToDelete, setPeaksToDelete] = useState([]);

    // Along with the user's completed peaks, you will need to fetch all of the peaks for them to choose from.

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
            console.log("Peaks added to list");
            setNewCompletedPeaks([]);
            } else {
                console.log("Error adding peaks to list")
            }
        } catch (error) {
            console.error('Error adding new peaks:', error);
        }
    };

    // This function will be called when a user updates the date completed.
    const updateCompletedPeaks = async () => {
        try {
            const response = await fetch('http://localhost:5000/completedPeaks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            credentials: 'include',
            body: JSON.stringify(peaksToUpdate),
            });

            if (response.ok) {
            console.log("Peaks successfully updated");
            setPeaksToUpdate([]);
            } else {
                console.log("Error updating peaks")
            }
        } catch (error) {
            console.error('Error updating peaks:', error);
        }
    };
  
    const deleteCompletedPeaks = async () => {
        try {
            const response = await fetch('http://localhost:5000/completedPeaks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            credentials: 'include',
            body: JSON.stringify(peaksToDelete),
            });

            if (response.ok) {
            console.log("Peaks successfully deleted");
            setPeaksToDelete([]);
            } else {
                console.log("Error deleting peaks")
            }
        } catch (error) {
            console.error('Error deleting peaks:', error);
        }
    };
  
    return (
      <>
        {user ? <h1>Hello, {user.username}!</h1> : null}
      </>
    );
  }
  
  export default UserList;