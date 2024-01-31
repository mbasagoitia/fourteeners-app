const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        'Cookie': document.cookie,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("logged in", data);
        return data.user;
      } else {
        throw new Error(data.message);
      }
}

export default login;