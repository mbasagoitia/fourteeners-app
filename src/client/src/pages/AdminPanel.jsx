import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchablePeaksList from "../components/SearchablePeaksList";
import { fetchAdminFeedback, fetchMsFeedback } from "../helpers/fetchAdminFeedback";

const AdminPanel = ({ user, peaks, onLoginRedirect }) => {

    const [selectedPeak, setSelectedPeak] = useState(null);
    const [adminFb, setAdminFb] = useState(null);
    const [currentFb, setCurrentFb] = useState(null);

    const [singleMsFbShown, setSingleMsFbShown] = useState(false);
    const [allMsFbShown, setAllMsFbShown] = useState(false);

    const [allFb, setAllFb] = useState(false);

    useEffect(() => {
        // Check if the user is logged in, if not, redirect to the login page
        if (!user && onLoginRedirect) {
        onLoginRedirect();
        }
    }, [user, onLoginRedirect]);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const fb = await fetchAdminFeedback();
                setAdminFb(fb);
            } catch (error) {
                console.error("Error fetching admin feedback:", error);
            }
        };
    
        fetchAdminData();
    }, []);

    const toggleSingleMsFb = () => {
        if (allMsFbShown) {
            setAllMsFbShown(false);
        }
        setSingleMsFbShown(!singleMsFbShown);
    }

    const toggleAllMsFb = () => {
        if (singleMsFbShown) {
            setSingleMsFbShown(false);
        }
        setAllMsFbShown(!allMsFbShown);
    }

    const onItemClick = async (item) => {
        const msFb = await fetchMsFeedback(item.id);
        setCurrentFb(msFb);
        setSelectedPeak(item);
    }

    const isItemSelected = (item) => {
        return selectedPeak === item;
    }

    const toggleAllFb = () => {
        setAllFb(!allFb);
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
                                    <Button className="mt-4" onClick={toggleSingleMsFb}>Search for Peaks</Button>
                                    <Button className="mt-4 mx-2" onClick={toggleAllMsFb}>Show All</Button>
                                    <div className={`admin-peaks-search mt-4 ${singleMsFbShown || allMsFbShown ? "d-block" : "d-none"}`}>
                                        {allMsFbShown ? <div>All MS Feedback</div> : null}
                                        {singleMsFbShown ? <SearchablePeaksList items={peaks} onItemClick={onItemClick} isItemSelected={isItemSelected} /> : null}
                                    </div>
                                </Col>
                                <Col md={6} className="admin-all-fb mt-4 mt-md-0 pb-4">
                                    <h2>Improvements</h2>
                                    <Button className="mt-4" onClick={toggleAllFb}>View all Suggestions</Button>
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