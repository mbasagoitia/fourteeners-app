// If logged in, a list of peaks that the user has already climbed
// Option to leave review for each route/peak

import {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import addCompletedPeaks from "../helpers/addCompletedPeaks";
import deleteCompletedPeak from "../helpers/deleteCompletedPeak";
import PeakListFilter from "../components/PeaksListFilter";
import CompletedPeaksList from "./CompletedPeaksList";

function UserList({ user }) {

    const [allPeaks, setAllPeaks] = useState([]);
    const [completedPeaks, setCompletedPeaks] = useState([]);
    const [newCompletedPeaks, setNewCompletedPeaks] = useState([]);
    
    // Will be an array of objects with properties peak_id and date_completed
    // Add new peaks to the list when the user uses the interface to add new peaks
    // There could be issues here because this will trigger a re-render of the useEffect.
  
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {        
        const fetchAllPeaks = async () => {
            try {
            const response = await fetch('http://localhost:5000/allPeaks', {
                method: 'GET',
                credentials: 'include',
                });
        
                if (response.ok) {
                    const data = await response.json();
                    setAllPeaks(data.allPeaks);
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
                setCompletedPeaks(data.completedPeaks);
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

    const handlePeakDelete = (peakToDelete) => {
        deleteCompletedPeak(peakToDelete);
        setCompletedPeaks(completedPeaks.filter((peak) => peak !== peakToDelete));
    }

    // When adding a new peak to the list, I am getting an error with my promise. See peaksController.
  
return (
    <>
    {user ? <h1 className="mb-4">{user.username}'s List</h1> : null}
    {completedPeaks.length > 0 && editMode ? (
        <>
        <Button onClick={() => setEditMode(false)}>Done Editing</Button>
        {allPeaks.length > 0 ? <PeakListFilter editMode={editMode} peaks={allPeaks} setNewCompletedPeaks={setNewCompletedPeaks} newCompletedPeaks={newCompletedPeaks} handleNewPeaksSubmit={handleNewPeaksSubmit} /> : null}
        <CompletedPeaksList peaks={completedPeaks} editMode={editMode} handlePeakDelete={handlePeakDelete} />
        </>
    ) : null}
    {completedPeaks.length > 0 && !editMode ? (
        <>
        <Button onClick={() => setEditMode(true)}>Edit List</Button>
        <CompletedPeaksList peaks={completedPeaks} editMode={editMode} handlePeakDelete={handlePeakDelete} />
        </>
    ) : null}
    </>
);
}

export default UserList;