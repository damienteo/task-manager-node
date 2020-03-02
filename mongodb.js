const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

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
    //   {
    //     name: "User01",
    //     age: 30
    //   },
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

    db.collection("tasks").insertMany(
      [
        {
          description: "Clean room",
          completed: true
        },
        {
          description: "Buy food",
          completed: false
        },
        {
          description: "Do homework",
          completed: false
        }
      ],
      (error, result) => {
        if (error) return console.log("Error:", error);

        return console.log(result.ops);
      }
    );
  }
);
