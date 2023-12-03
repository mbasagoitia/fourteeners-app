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

  // Register and login routes

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

  // Routes to handle users' completed peaks

  router.get('/allPeaks', async (req, res) => {
    try {
      const isAuthenticated = req.isAuthenticated();
  
      if (isAuthenticated) {
        const allPeaks = await fetchAllPeaks();
        res.json({ allPeaks });
      } else {
        res.json({ isAuthenticated });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    
  router.get('/completedPeaks', async (req, res) => {
    try {
      const isAuthenticated = req.isAuthenticated();
  
      if (isAuthenticated) {
        const completedPeaks = await fetchCompletedPeaks(req.user.id);
        res.json({ isAuthenticated, completedPeaks });
      } else {
        res.json({ isAuthenticated });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  async function fetchAllPeaks() {
    const result = await pool.query('SELECT peaks.id, peaks.name, peaks.img, peaks.elevation, peaks.range FROM peaks');
    return result;
  }

  async function fetchCompletedPeaks(userId) {
    const result = await pool.query('SELECT DISTINCT peaks.id, peaks.name, peaks.img, peaks.elevation, peaks.range, completed_peaks.date_completed FROM peaks INNER JOIN completed_peaks ON peaks.id = completed_peaks.peak_id WHERE completed_peaks.user_id = ?', [userId]);
    return result;
  }

  

  router.post('/completedPeaks', async (req, res) => {
    const { newCompletedPeaks, peakToDelete } = req.body;
  
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
  
      try {
        if (newCompletedPeaks && newCompletedPeaks.length > 0) {
          for (let peak of newCompletedPeaks) {
            await pool.query('INSERT INTO completed_peaks (user_id, peak_id) VALUES (?, ?)', [
              req.user.id,
              peak.id
            ]);
          }
        }

      if (peakToDelete) {
          await pool.query('DELETE FROM completed_peaks WHERE user_id = ? AND peak_id = ?', [
            req.user.id,
            peakToDelete.id
          ]);
        }
        return res.status(200).json({ message: 'Peaks added/deleted successfully' });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  });
  
  router.put('/completedPeaks', async (req, res) => {
    const peak = req.body;
  
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
  
      try {
          await pool.query(
            'UPDATE completed_peaks SET date_completed = ? WHERE user_id = ? AND peak_id = ?',
            [peak.date_completed, req.user.id, peak.id]
          );
        return res.status(200).json({ message: 'Peak updated successfully' });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  });
      
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
