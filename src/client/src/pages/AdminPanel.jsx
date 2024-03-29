import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchablePeaksList from "../components/SearchablePeaksList";

const AdminPanel = ({ user, peaks, onLoginRedirect }) => {

    const [selectedPeak, setSelectedPeak] = useState(null);

    useEffect(() => {
        // Check if the user is logged in, if not, redirect to the login page
        if (!user && onLoginRedirect) {
        onLoginRedirect();
        }
    }, [user, onLoginRedirect]);

    const onItemClick = (item) => {
        // Trigger a fetch request for feedback for each peak
        setSelectedPeak(item);
    }

    const isItemSelected = (item) => {
        return selectedPeak === item;
    }

    return (
        user && user.isAdmin ? (
            <div className="content-container">
                <div className="overlay-container">
                    <div className="fullsize-overlay-box">
                        <h1>Admin Panel</h1>
                        <Container className="admin-panel p-0">
                            <Row className="mt-4">
                                <Col md={6} className="admin-ms-fb">
                                    <h2>Mountain-Specific Feedback</h2>
                                    <div className="admin-peaks-search mt-4">
                                        <SearchablePeaksList items={peaks} onItemClick={onItemClick} isItemSelected={isItemSelected} />
                                    </div>
                                </Col>
                                <Col md={6} className="admin-all-fb mt-4 mt-md-0 pb-4">
                                    <h2>All Feedback</h2>
                                    <Button className="mt-4">View All Feedback</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        ) : <p>You do not have permission to view this page.</p>
    )
}

export default AdminPanel;