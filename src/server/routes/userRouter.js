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
  
router.post(
'/login',
passport.authenticate('local', {
    // Edit where to redirect since I won't have a dedicated user dashboard
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
})
);
  
router.get('/logout', (req, res) => {
req.logout();
res.redirect('/');
});

// Will not get a dashboard page. Move logic to /login
router.get('/dashboard', isAuthenticated, (req, res) => {
    const userData = {
        username: req.user.username,
        // add in their list of completed peaks
      };
      
      res.json(userData);
  });

router.get('/login', (req, res) => {
res.send('Login form goes here.');
});

module.exports = router;