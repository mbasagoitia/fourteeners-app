import { useEffect } from "react";

const LightBox = ({ images, lightboxIndex, setLightboxIndex, closeLightbox }) => {

    const prevImage = (e) => {
        setLightboxIndex((lightboxIndex + images.length - 1) % images.length);
        e.stopPropagation();
      };
    
      const nextImage = (e) => {
        setLightboxIndex((lightboxIndex + 1) % images.length);
        e.stopPropagation();
      };

      useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                prevImage(e);
            } else if (e.key === "ArrowRight") {
                nextImage(e);
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightboxIndex]);
    

    return (
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
    )
}

export default LightBox;