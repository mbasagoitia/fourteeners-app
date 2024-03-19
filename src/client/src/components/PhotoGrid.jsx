import Button from "react-bootstrap/Button";
import { FaTrash } from 'react-icons/fa';

function PhotoGrid ({ mode, fn, images }) {

  return (
        <>
        <hr className="photo-grid-hr" />
        <h2>Photos</h2>
        <div className="photo-grid">
        {images.map((image, index) => {
        const fileExtension = image.url.split('.').pop().toLowerCase();

        if (['mp4'].includes(fileExtension)) {
          return (
            <div
              className="photo-grid-item zoom-hover"
              key={index}
              onClick={mode === "view" ? () => fn(index) : null}
            >
              <video controls>
                <source src={image.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {mode === "delete" ? (
                <div className="delete-overlay">
                  <Button className="delete-photo-btn" onClick={() => fn(image.id)}><FaTrash size={15} /></Button>
                </div>
              ) : null}
            </div>
          );
        } else {
          return (
            <div
              className="photo-grid-item"
              key={index}
              onClick={mode === "view" ? () => fn(index) : null}
            >
              <img src={image.url} alt={`Image ${index}`} />
              {mode === "delete" ? (
                <div className="delete-overlay">
                  <Button className="delete-photo-btn" onClick={() => fn(image.id)}><FaTrash size={15} /></Button>
                </div>
              ) : null}
            </div>
          );
        }
      })}
      </div>
      </>
    )
}

export default PhotoGrid;