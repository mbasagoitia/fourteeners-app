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
  resetPassword,
  updateEmail,
  updateUsername
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
          const [users] = await pool.query('SELECT id, username, email, password_hash FROM users WHERE email = ?', [email]);
  
          if (users.length === 0) {
            return done(null, false, { message: 'Email not recognized.' });
          }
  
          const user = users[0];
          const passwordMatch = await bcrypt.compare(password, user.password_hash);
  
          if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
          }
  
          return done(null, { id: user.id, username: user.username, email: user.email });
        } catch (error) {
          console.error('Error during login:', error);
          return done(error);
        }
      }
    )
  );
  
  
  passport.serializeUser((user, done) => {
    done(null, { id: user.id, username: user.username, email: user.email });
  });
  
  
  passport.deserializeUser(async (serializedUser, done) => {
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [serializedUser.id]);
      const user = users[0];
      done(null, user);
    } catch (error) {
      console.error('Error during deserialization:', error);
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
  router.post('/reset-password/:token', (req, res, next) => {
    resetPassword(pool, req, res, next);
  });

  //What if email/username are already in use?

  router.put('/update-email', (req, res, next) => {
    updateEmail(pool, req, res, next);
  });

  router.put('/update-username', (req, res, next) => {
    updateUsername(pool, req, res, next);
  });

  return router;  
};

export default userRouter;
