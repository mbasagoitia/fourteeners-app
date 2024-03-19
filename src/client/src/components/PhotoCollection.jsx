import React, { useState, useEffect } from "react";
import PhotoGrid from "./PhotoGrid";
import LightBox from "./Lightbox";

const PhotoCollection = ({ images }) => {
  
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIsOpen(true);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIsOpen(false);
  };

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (lightboxIsOpen && event.key === "Escape") {
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
  }, []);

  return (
    <div>
      <PhotoGrid mode="view" images={images} fn={openLightbox} />
      {lightboxIsOpen && (
        <LightBox images={images} lightboxIndex={lightboxIndex} setLightboxIndex={setLightboxIndex} closeLightbox={closeLightbox} />
      )}
    </div>
  );
}

export default PhotoCollection;
