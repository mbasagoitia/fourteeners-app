const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/getUser', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        return data.user;

      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

export default fetchUserData;