import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import sendPwResetEmail from '../helpers/user/sendEmail.js';
import { registerNewUser, updateUserEmail, updateUserUsername } from '../helpers/queries/userQueries.js';
import sanitizeHtml from 'sanitize-html';

const registerUser = async (pool, req, res, next) => {
    let { username, email, password } = req.body;

    username = sanitizeHtml(username);
    email = sanitizeHtml(email);
    password = sanitizeHtml(password);

    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      registerNewUser(pool, username, email, hashedPassword);  
      return res.status(200).json({ message: 'Registration successful' });
  
    } catch(err) {
      next(err);
    }
}

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ error: 'Login failed' });
        }
        res.header('Access-Control-Allow-Credentials', true);
        return res.status(200).json({ message: 'Login successful', user });
      });
    })(req, res, next);
}

const logoutUser = (req, res, next) => {
    req.logout((err) => {
      if (err) { 
        next(err); 
      } else {
        return res.status(200).json({ message: 'Logout successful' });
      }
    });
  }

const getUser = async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        const user = req.user;
        res.status(200).json({ user });
      } else {
        res.status(401).json({ message: 'User not authenticated' });
      }
    } catch (error) {
      next(err);
    }
}

const generateToken = (email) => {
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const sendPasswordResetEmail = async (req, res, next) => {
  try {
    const recipient = sanitizeHtml(req.body.email);
    const token = generateToken(req.body.email);
    const resetLink = `http://localhost:3000/create-new-password?token=${token}`;

    sendPwResetEmail(recipient, resetLink);
    
    return res.status(200).json({ success: true, message: 'Reset password email sent.' });
  } catch (error) {
    next(error);
  }
}

const resetPassword = async (pool, req, res, next) => {
  const token = req.params.token;
  let { password } = req.body;
  password = sanitizeHtml(password);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const hashedPassword = await bcrypt.hash(password, 10);
    const userEmail = decoded.email;

    await pool.query('UPDATE users SET password_hash = ? WHERE email = ?', [
      hashedPassword,
      userEmail,
    ]);
    
    return res.status(200).json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    next(error);
  }
}

const updateEmail = async (pool, req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    try {
        const userId = req.user.id;
        let { newEmail } = req.body;
        newEmail = sanitizeHtml(newEmail);
        updateUserEmail(pool, userId, newEmail);
        res.status(200).json({ success: true, message: 'Email address successfully updated.' });
    } catch (error) {
      next(error);
    }
  }  else {
    res.status(401).json({ message: "Unauthorized request" });
  }
}

const updateUsername = async (pool, req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    try {
        const userId = req.user.id;
        let { newUsername } = req.body;
        newUsername = sanitizeHtml(newUsername);
        updateUserUsername(pool, userId, newUsername);
        res.status(200).json({ success: true, message: 'Username successfully updated.' });
    } catch (error) {
      next(error);
    }
  }  else {
    res.status(401).json({ message: "Unauthorized request" });
  }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    sendPasswordResetEmail, 
    resetPassword,
    updateEmail,
    updateUsername
}