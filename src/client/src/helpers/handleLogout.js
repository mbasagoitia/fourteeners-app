const handleLogout = async (setUser, navigate) => {

    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'GET',
      });

      const data = response.json();
      
      if (response.ok) {
        console.log("Logged out");
        setUser(null);
        navigate("/");
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
};

export default handleLogout;