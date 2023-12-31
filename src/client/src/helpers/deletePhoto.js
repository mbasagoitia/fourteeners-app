const deletePhoto = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/peak-photos/${id}`, {
        method: 'DELETE',
        credentials: 'include'
        });
        if (response.ok) {
        console.log("Photo successfully deleted");
        } else {
            console.error("Error deleting photo")
        }
    } catch (error) {
        console.error('Error deleting photo:', error);
    }
}

export default deletePhoto;