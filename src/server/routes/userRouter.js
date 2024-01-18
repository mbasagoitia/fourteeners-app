import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  sendPasswordResetEmail,
  resetPassword
} from '../controllers/userController.js';


const userRouter = (pool) => {
  const router = Router();

  router.use(passport.initialize());
  router.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
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

  router.post('/register', (req, res, next) => {
    registerUser(pool, req, res, next);
  });
  router.post('/login', loginUser);
  router.get('/getUser', getUser);
  router.get('/logout', logoutUser);

  // Send password reset email
  router.post('/reset-password', (req, res, next) => {
    sendPasswordResetEmail(req, res, next);
  });

  // Verify token and reset password
  router.post('/reset-password/:token', async (req, res, next) => {
    resetPassword(pool, req, res, next);
  });

  router.put('/update-email', async (req, res, next) => {
    
    try {
      if (req.isAuthenticated()) {
      // update email logic
      // Use req.body.email and req.body.newEmail
      // Write a query that sets current email to new email
      return res.status(200).json({ success: true, message: 'Email address updated.' });
    } else {
        res.status(401).json({ message: "Unauthorized request" });
      }
    } catch (error) {
      next(error);
    }
  });

  return router;  
};

export default userRouter;
