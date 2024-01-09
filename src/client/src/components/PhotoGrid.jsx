import Button from "react-bootstrap/Button";

function PhotoGrid ({ mode, fn, images }) {

    return (
        <div className="photo-grid mt-4">
        {images.map((image, index) => {
        const fileExtension = image.url.split('.').pop().toLowerCase();

        // Also handle other video types
        if (['mp4'].includes(fileExtension)) {
          return (
            <div
            // Conditionally render zoom hover
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
                  <Button className="delete-photo-btn" onClick={() => fn(image.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                  </Button>
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
                  <Button className="delete-photo-btn" onClick={() => fn(image.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                  </Button>
                </div>
              ) : null}
            </div>
          );
        }
      })}
        </div>
    )
}

export default PhotoGrid;