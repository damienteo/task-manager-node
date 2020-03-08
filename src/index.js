const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`listening on port:${port}`);
});