import bcrypt from 'bcrypt';
import passport from 'passport';


const registerUser = async (pool, req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      await pool.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [
        username,
        email,
        hashedPassword,
      ]);
  
      return res.status(200).json({ message: 'Registration successful' });
  
    } catch(err) {
      next(err);
    }
}

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed', flash: req.flash('error') });
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

export {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}