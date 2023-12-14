const fetchPhotos = (peakId) => {
    return fetch(`http://localhost:5000/peak-photos?peak_id=${peakId}`, {
      credentials: "include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      return response.json();
    })
    .then((data) => {
      const photoInfo = data.images.map((image) => {
        return { id: image.id, url: image.url.slice(13) };
      });
  
      const fetchPromises = photoInfo.map((photo) => {
        return fetch(`http://localhost:5000/peak-photos/${photo.url}`, {
          credentials: "include"
        })
        .then((imageResponse) => {
          if (imageResponse.ok) {
            return imageResponse.blob();
          } else {
            throw new Error('Failed to fetch image');
          }
        })
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          return { ...photo, url: imageUrl };
        })
        .catch((error) => {
          console.error('Error fetching image:', error);
          return null;
        });
      });
  
      return Promise.all(fetchPromises)
        .then((updatedPhotos) => {
          const newPhotoInfo = photoInfo.map((photo, index) => {
            return updatedPhotos[index] || photo;
          });
          return newPhotoInfo;
        })
        .catch((error) => {
          console.error('Error fetching all images:', error);
          return photoInfo;
        });
    })
    .catch((error) => {
      console.error('Error fetching photo URLs:', error);
      return [];
    });
  }

export default fetchPhotos;