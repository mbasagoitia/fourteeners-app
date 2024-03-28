import { useEffect } from "react";

const AdminPanel = ({ user, peaks, onLoginRedirect }) => {

    useEffect(() => {
        // Check if the user is logged in, if not, redirect to the login page
        if (!user && onLoginRedirect) {
        onLoginRedirect();
        }
    }, [user, onLoginRedirect]);

    return (
        user && user.isAdmin ? (
            <div>Admin Panel</div>
        ) : <div>You do not have permission to view this page.</div>
    )
}

export default AdminPanel;