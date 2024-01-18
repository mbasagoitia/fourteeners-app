const registerNewUser = (pool, username, email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    
        pool.query(query, [username, email, hashedPassword], (error, result) => {
          if (error) {
            reject(new Error(`Error registering user: ${error.message}`));
          } else {
            resolve(result);
          }
        });
      });
}

const updateUserEmail = (pool, userId, newEmail) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET email = ? WHERE id = ?';
  
      pool.query(query, [newEmail, userId], (error, result) => {
        if (error) {
          reject(new Error(`Error updating email address: ${error.message}`));
        } else {
          resolve(result);
        }
      });
    });
  };

const updateUserUsername = (pool, userId, newUsername) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET username = ? WHERE id = ?';
  
      pool.query(query, [newUsername, userId], (error, result) => {
        if (error) {
          reject(new Error(`Error updating username: ${error.message}`));
        } else {
          resolve(result);
        }
      });
    });
  };

export {
    registerNewUser,
    updateUserEmail,
    updateUserUsername
}