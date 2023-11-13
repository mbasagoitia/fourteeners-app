const express = require("express");
const dotenv = require("dotenv");
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2/promise');
const isAuthenticated = require("../middlewares/isAuthenticated");

dotenv.config();

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

const pool = mysql.createPool(dbConfig);
const sessionStore = new MySQLStore({}, pool);

router.use(
session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
})
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  
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
    res.redirect('/login');
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
});
  
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed', flash: req.flash('error') });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: 'Login failed' });
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
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

async function fetchCompletedPeaks(userId) {
  const result = await pool.query('SELECT * FROM completed_peaks WHERE user_id = ?', [userId]);
  return result;
}
  
router.get('/logout', (req, res) => {
req.logout();
res.redirect('/');
});

module.exports = router;