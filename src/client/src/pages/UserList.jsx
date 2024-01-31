import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import addCompletedPeaks from "../helpers/addCompletedPeaks";
import deleteCompletedPeak from "../helpers/deleteCompletedPeak";
import PeakListFilter from "../components/PeaksListFilter";
import CompletedPeaksList from "./CompletedPeaksList";
import fetchCompletedPeaks from "../helpers/fetchCompletedPeaks";

function UserList({ user, peaks, onLoginRedirect }) {
  // If logged in, this will show a list of peaks that the user has already climbed
  // They can edit their list, add a completed date, and upload photos

    const [completedPeaks, setCompletedPeaks] = useState([]);
    const [newCompletedPeaks, setNewCompletedPeaks] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      // Check if the user is logged in, if not, redirect to the login page
      if (!user && onLoginRedirect) {
        onLoginRedirect();
      }
    }, [user, onLoginRedirect]);

    useEffect(() => {    
        const fetchPeaks = async () => {
          const results = await fetchCompletedPeaks();
          setCompletedPeaks(results);
        }

        fetchPeaks();
        }, [user, newCompletedPeaks]);  

    const handleNewPeaksSubmit = () => {
        addCompletedPeaks(newCompletedPeaks);
        setNewCompletedPeaks([]);
    }

    const handlePeakDelete = (peakToDelete) => {
        deleteCompletedPeak(peakToDelete);
        setCompletedPeaks(completedPeaks.filter((peak) => peak !== peakToDelete));
    }
  
return (
    <>
    {user ? <h1 className="mb-4">{user.username}'s List</h1> : null}
    {completedPeaks.length === 0 ? (
        <>
        <PeakListFilter editMode={editMode} peaks={peaks} setCompletedPeaks={setCompletedPeaks} newCompletedPeaks={newCompletedPeaks} setNewCompletedPeaks={setNewCompletedPeaks} handleNewPeaksSubmit={handleNewPeaksSubmit} />
        <p className="text-muted mt-4">It looks like you haven't added any peaks yet! Add to your list or use our <Link to={"/summit-selector"}>Summit Selector Tool</Link> to help you select your first fourteener.</p>
        </>
    ): null}
    {completedPeaks.length > 0 && editMode ? (
        <>
        <Button onClick={() => setEditMode(false)}>Done Editing</Button>
        <PeakListFilter editMode={editMode} peaks={peaks} setCompletedPeaks={setCompletedPeaks} newCompletedPeaks={newCompletedPeaks} setNewCompletedPeaks={setNewCompletedPeaks} handleNewPeaksSubmit={handleNewPeaksSubmit} />
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