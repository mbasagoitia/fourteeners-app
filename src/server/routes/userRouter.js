const express = require("express");
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

module.exports = (pool) => {
  router.use(passport.initialize());
  router.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        console.log("password string:", password);
        try {
          const [users] = await pool.query('SELECT id, username, password_hash FROM users WHERE email = ?', [email]);
  
          if (users.length === 0) {
            return done(null, false, { message: 'Email not recognized.' });
          }

          const user = users[0];
          const passwordMatch = await bcrypt.compare(password, user.password_hash);

          if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      const user = users[0];
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Register route

  router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      await pool.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [
        username,
        email,
        hashedPassword,
      ]);
  
      return res.status(200).json({ message: 'Registration successful' });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Log in route
  
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
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
  });

  // Get user info to reference for subsequent requests

  router.get('/getUser', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const user = req.user;
        res.status(200).json({ user });
      } else {
        res.status(401).json({ message: 'User not authenticated' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Log out route

  router.get('/logout', function(req, res, next){
    req.logout((err) => {
      if (err) { 
        return next(err); 
      } else {
        return res.status(200).json({ message: 'Logout successful' });
      }
    });
  });

  return router;
};
