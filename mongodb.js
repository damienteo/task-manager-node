const mongodb = require("mongodb");

const { MongoClient, ObjectID } = mongodb;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Error:", error);
    }

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   { _id: id, name: "User04", age: 33 },
    //   (error, result) => {
    //     if (error) return console.log("Error:", error);

    //     return console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "User02",
    //       age: 31
    //     },
    //     {
    //       name: "User03",
    //       age: 32
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) return console.log("Error:", error);

    //     return console.log(result.ops);
    //   }
    // );

    //   db.collection("tasks").insertMany(
    //     [
    //       {
    //         description: "Clean room",
    //         completed: true
    //       },
    //       {
    //         description: "Buy food",
    //         completed: false
    //       },
    //       {
    //         description: "Do homework",
    //         completed: false
    //       }
    //     ],
    //     (error, result) => {
    //       if (error) return console.log("Error:", error);

    //       return console.log(result.ops);
    //     }
    //   );

    // db.collection("users").findOne({ name: "User01" }, (error, user) => {
    //   if (error) return console.log("Error:", error);

    //   return console.log(user);
    // });

    // db.collection("users")
    //   .find({ name: "User01" })
    //   .toArray((error, user) => {
    //     if (error) return console.log("Error:", error);

    //     return console.log(user);
    //   });

    // db.collection("users")
    //   .find({ name: "User01" })
    //   .count((error, count) => {
    //     if (error) return console.log("Error:", error);

    //     return console.log(count);
    //   });

    // db.collection("tasks")
    //   .find()
    //   .limit(1)
    //   .sort({ $natural: -1 })
    //   .toArray((error, task) => {
    //     if (error) return console.log("Error:", error);

    //     return console.log(task);
    //   });

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     if (error) return console.log("Error:", error);

    //     return console.log(tasks);
    //   });

    // const updatePromise = db.collection("users").updateOne(
    //   {
    //     _id: new ObjectID("5e5d1ee761824e434ae178eb")
    //   },
    //   {
    //     // $set: {
    //     //   name: "NewName"
    //     // }
    //     $inc: {
    //       age: 100
    //     }
    //   }
    // );

    // updatePromise
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: true
    //     },
    //     {
    //       $set: {
    //         completed: false
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // db.collection("users")
    //   .deleteMany({
    //     age: 30
    //   })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .deleteOne({
        description: "Clean room"
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
