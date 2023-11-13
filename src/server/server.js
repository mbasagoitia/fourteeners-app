const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
const userRouter = require("./routes/userRouter");
const { join } = require("path");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.static(join(__dirname, "../client/build")));

app.use("/api", apiRouter);
app.use(userRouter);

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
})