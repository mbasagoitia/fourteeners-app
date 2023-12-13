import React, { useState, useEffect } from "react";
import deletePhoto from "../helpers/deletePhoto";
import PhotoGrid from "../components/PhotoGrid";

function PhotoCollection({ images }) {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIsOpen(true);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIsOpen(false);
  };

  const prevImage = (event) => {
    if (!event.target.classList.contains("close")) {
      setLightboxIndex((lightboxIndex + images.length - 1) % images.length);
    }
    event.stopPropagation();
  };

  const nextImage = (event) => {
    if (!event.target.classList.contains("close")) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
    event.stopPropagation();
  };

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape" && lightboxIsOpen) {
        closeLightbox();
      }
    };

    const handleOutsideClick = (event) => {
      if (lightboxIsOpen && event.target === event.currentTarget) {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleEscKeyPress);
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [lightboxIsOpen]);

  return (
    <div className="photo-grid mt-4">
      <PhotoGrid mode="view" images={images} fn={openLightbox} />

      {lightboxIsOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close" onClick={closeLightbox}>
            &times;
          </span>
          {images[lightboxIndex].url.toLowerCase().endsWith('.mp4') ? (
            <video controls autoPlay>
              <source src={images[lightboxIndex].url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={images[lightboxIndex].url} alt={`Image ${images[lightboxIndex].id}`} />
          )}
          <a className="prev" onClick={prevImage}>
            &#8249;
          </a>
          <a className="next" onClick={nextImage}>
            &#8250;
          </a>
          <div className="progress-bar">
            {images.map((_, index) => (
              <span
                key={index}
                className={`progress-dot ${index === lightboxIndex ? 'active' : ''}`}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoCollection;
