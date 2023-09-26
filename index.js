const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
// database
const connectDB = require("./db/connect");
// routers
const userRouter = require("./routers/userRoutes");
const exerciseRouter = require("./routers/exerciseRoutes");
const logRouter = require("./routers/logRoutes");
require("dotenv").config();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/api", (req, res) => {
  res.send("Welcome to the API home page!");
});
app.use("/api/users", userRouter);
app.use("/api/users", exerciseRouter);
app.use("/api/users", logRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
