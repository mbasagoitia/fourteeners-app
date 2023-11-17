// If logged in, a list of peaks that the user has already climbed
// Option to check off, view completed peaks (greyed out list with completed ones in color?)
// Option to leave review for each route/peak

import {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import addCompletedPeaks from "../helpers/addCompletedPeaks";
import updateCompletedPeaks from "../helpers/updateCompletedPeaks";
import deleteCompletedPeaks from "../helpers/deleteCompletedPeaks";
import PeakListFilter from "../components/PeaksListFilter";
import CompletedPeaksList from "./CompletedPeaksList";

function UserList({ user }) {

    const [allPeaks, setAllPeaks] = useState([]);
    const [completedPeaks, setCompletedPeaks] = useState([]);

    // Will be an array of objects with properties peak_id and date_completed
    // Add new peaks to the list when the user uses the interface to add new peaks
    // There could be issues here because this will trigger a re-render of the useEffect.
    const [newCompletedPeaks, setNewCompletedPeaks] = useState([]);

    useEffect(() => {
        console.log(newCompletedPeaks);
    }, [newCompletedPeaks]);

    // Will be an array of objects with properties peak_id and date_completed
    // Add new peaks to the list when user updates the date completed on any of their current list
    const [peaksToUpdate, setPeaksToUpdate] = useState([]);

    // Will be an array of peak_ids
    // Add new peaks to the list when the user deletes a peak from their current list
    const [peaksToDelete, setPeaksToDelete] = useState([]);

    useEffect(() => {        
        const fetchAllPeaks = async () => {
            try {
            const response = await fetch('http://localhost:5000/allPeaks', {
                method: 'GET',
                credentials: 'include',
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.allPeaks[0]);
                    setAllPeaks(data.allPeaks[0]);
                } else {
                    console.error('Failed to fetch all peaks');
                }
                } catch (error) {
                console.error('Error fetching all peaks:', error);
            }
        };
        
        fetchAllPeaks();
        }, []);

    useEffect(() => {    
        const fetchCompletedPeaks = async () => {
            try {
              const response = await fetch('http://localhost:5000/completedPeaks', {
                method: 'GET',
                credentials: 'include',
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log(data.completedPeaks[0]);
                setCompletedPeaks(data.completedPeaks[0]);
              }
            } catch (error) {
              console.error('Error fetching peaks:', error);
            }
          };
        
          fetchCompletedPeaks();
        }, [user, newCompletedPeaks]);  

    const handleNewPeaksSubmit = () => {
        addCompletedPeaks(newCompletedPeaks);
        setNewCompletedPeaks([]);
    }
  
return (
    <>
    {/* Start with just the user's completed peaks (or a message of "you dont have any peaks, add some") */}
    {/* Have a + button that opens a search filter to search for peaks to add to list */}
    {user ? <h1 className="mb-4">{user.username}'s List</h1> : null}
    {allPeaks.length > 0 ? <PeakListFilter peaks={allPeaks} setNewCompletedPeaks={setNewCompletedPeaks} newCompletedPeaks={newCompletedPeaks} handleNewPeaksSubmit={handleNewPeaksSubmit} /> : null}
    {completedPeaks.length > 0 ? <CompletedPeaksList peaks={completedPeaks} /> : null}
    </>
);
}

export default UserList;