function PhotoGrid ({ mode, fn, images }) {
    return (
        <div className="photo-grid mt-4">
        {images.map((image, index) => {
        const fileExtension = image.url.split('.').pop().toLowerCase();

        if (['mp4'].includes(fileExtension)) {
          return (
            <div
            // Conditionally render zoom hover
              className="photo-grid-item zoom-hover"
              key={index}
              // Here make sure to edit the second function to be the delete photo function
              onClick={mode === "view" ? () => fn(index) : null}
            >
              <video controls>
                <source src={image.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* make this a hover effect that shows an overlay and a trashcan */}
            {mode === "delete" ? <span className="delete-photo-btn" onClick={null}>&times;</span> : null}
            </div>
          );
        } else {
          return (
            <div
              className="photo-grid-item"
              key={index}
              // Same thing here
              onClick={mode === "view" ? () => fn(index) : null}
            >
              <img src={image.url} alt={`Image ${index}`} />
              {/* make this a hover effect that shows an overlay and a trashcan */}
              {mode === "delete" ? <span className="delete-photo-btn" onClick={null}>&times;</span> : null}
            </div>
          );
        }
      })}
        </div>
    )
}

export default PhotoGrid;