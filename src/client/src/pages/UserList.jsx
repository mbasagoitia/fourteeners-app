// If logged in, a list of peaks that the user has already climbed
// Option to check off, view completed peaks (greyed out list with completed ones in color?)
// Option to leave review for each route/peak

import {useState, useEffect} from "react";

function UserList({ user }) {

    const [completedPeaks, setCompletedPeaks] = useState([]);

    useEffect(() => {
        // Send a fetch request to the backend/completedPeaks and retrieve the user's list of completed peaks from the database.
    }, [user])

    return (
      <>
        {user ? <h1>Hello, {user.username}!</h1> : null}
      </>
    );
  }
  
  export default UserList;