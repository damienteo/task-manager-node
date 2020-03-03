const mongoose = require("mongoose");
const validator = require("validator");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";
const databaseName = "task-manager";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// const User = mongoose.model("User", {
//   name: { type: String, required: true, trim: true },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age cannot be negative");
//       }
//     }
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Please provide a valid email");
//       }
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Password should not include 'Password'");
//       }
//     }
//   }
// });

// const newUser = new User({
//   name: "   User08",
//   email: "     test3@test.com",
//   password: "         re"
// });

// newUser
//   .save()
//   .then(response => console.log(response))
//   .catch(error => console.log(error));

const Task = mongoose.model("Task", {
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const newTask = new Task({
  description: "Do homework"
  //   completed: false
});

newTask
  .save()
  .then(response => console.log(response))
  .catch(error => console.log(error));
