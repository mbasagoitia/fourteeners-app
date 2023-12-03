const express = require("express");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const apiRouter = require("./routes/api");
const userRouter = require("./routes/userRouter");
const photoRouter = require("./routes/photoRouter");
const { join } = require("path");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const mysql = require('mysql2/promise');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.static(join(__dirname, "../client/build")));

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(dbConfig); 

const sessionStore = new MySQLStore({}, pool);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    }
  })
);

app.use("/api", apiRouter);
app.use(userRouter(pool));
app.use(photoRouter);

app.use((req, res, next) => {
  try {
    res.sendFile(join(__dirname, "../client/build/index.html"));
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
