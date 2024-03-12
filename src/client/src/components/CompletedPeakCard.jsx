import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DateSelect from "../components/DateSelect";
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import PhotoUpload from '../components/PhotoUpload';
import CompletedPeakDetails from './CompletedPeakDetails';
import fetchPhotos from '../helpers/fetchPhotos';
import { FaCamera, FaTrash } from 'react-icons/fa';

function CompletedPeakCard ({ peak, editMode, handlePeakDelete }) {

  const [dateCompleted, setDateCompleted] = useState(peak.date_completed ? peak.dateCompleted : "");
  const [photoUploadShown, setPhotoUploadShown] = useState(false);
  const [viewDetailsShown, setViewDetailsShown] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [allPhotosFetched, setAllPhotosFetched] = useState(false);

  useEffect(() => {
    fetchPhotos(peak.id)
    .then((fetchedPhotos) => {
      setPhotos(fetchedPhotos);
      setAllPhotosFetched(true);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  const formatDate = (dateCompleted) => {
      const date = parseISO(dateCompleted);
      const formattedDate = format(date, "MMMM dd, yyyy", { locale: enUS });
      return formattedDate;
  }

  return (
      <>
      <div className={`photo-upload-overlay ${photoUploadShown ? "" : "d-none"}`}>
        <div className="photo-upload-overlay-box">
          {allPhotosFetched ? <PhotoUpload photos={photos} setPhotos={setPhotos} peak={peak} photoUploadShown={photoUploadShown} setPhotoUploadShown={setPhotoUploadShown} /> : null}
        </div>
      </div>
      <div className={`view-details-overlay ${viewDetailsShown ? "" : "d-none"}`}>
        <div className="view-details-overlay-box">
          {allPhotosFetched ? (
            <CompletedPeakDetails peak={peak} photos={photos} viewDetailsShown={viewDetailsShown} setViewDetailsShown={setViewDetailsShown} />
          ) : <CompletedPeakDetails peak={peak} viewDetailsShown={viewDetailsShown} setViewDetailsShown={setViewDetailsShown} />}
        </div>
      </div>
      <Card className="completed-peak-card">
      <Card.Img variant="top" src={peak.img} />
      <Card.Body>
        <Card.Title>{peak.name}</Card.Title>
        <Card.Text>{peak.elevation.toLocaleString()} ft.</Card.Text>
        <Card.Text className="card-range-text">{peak.range} Range</Card.Text>
        {editMode ? (
          <DateSelect peak={peak} dateCompleted={dateCompleted} setDateCompleted={setDateCompleted} />
          ) : (
            <p className="date-completed-text">{peak.date_completed && `Completed On ${formatDate(peak.date_completed)}`}</p>
          ) || null}

        {editMode ? (
          <>
          <div className="edit-btns-wrapper">
            <Button onClick={() => setPhotoUploadShown(true)} className="add-photos-btn"><FaCamera size={15} /></Button>
            <Button onClick={() => handlePeakDelete(peak)} className="delete-peak-btn"><FaTrash size={15} /></Button>
          </div>
          </>
        ) : <Button onClick={() => {
          setViewDetailsShown(true);
        }} variant="primary">View Details</Button>}
      </Card.Body>
    </Card>
    </>
  )
}

export default CompletedPeakCard;   