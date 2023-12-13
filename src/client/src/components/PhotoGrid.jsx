function PhotoGrid ({ mode, fn, images }) {
    return (
        <>
        {images.map((image, index) => {
        const fileExtension = image.url.split('.').pop().toLowerCase();

        if (['mp4'].includes(fileExtension)) {
          return (
            <div
              className="photo-grid-item"
              key={index}
              // Here make sure to edit the second function to be the delete photo function
              onClick={mode === "view" ? () => fn(index) : null}
            >
              <video controls>
                <source src={image.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
            </div>
          );
        }
      })}
        </>
    )
}

export default PhotoGrid;