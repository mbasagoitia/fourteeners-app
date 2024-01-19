const sendPasswordLink = (email) => {
    fetch("http://localhost:5000/reset-password", {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
        console.log(data.message);
    })
    .catch((error) => {
      console.error("Error sending password reset link:", error.message);
      return error.message;
    });
  };
  
  export default sendPasswordLink;
  