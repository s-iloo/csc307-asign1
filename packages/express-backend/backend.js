import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

let users = {
  users_list: [],
};
app.use(cors());
app.use(express.json());

const generateUserID = () => {
  return Math.random() * 100;
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  console.log(user);
  console.log("new user list after add");
  console.log(users);
  return user;
};
const deleteUser = (id) => {
  console.log("trying to delete id of " + id);
  const idx = users["users_list"].findIndex((u) => u.id == id);
  users["users_list"].splice(idx, 1);
  return users;
};
const findUserByJobAndName = (job, name) => {
  return users["users_list"].filter(
    (user) => user["job"] === job && user["name"] === name
  );
};

app.get("/users", (req, res) => {
  console.log("THIS ONEHAHAHAA");
  const name = req.query.name;
  const job = req.query.job;
  let result = userServices.getUsers(name, job).then((result) => {
    res.send(result);
    // console.log(result);
  });
});

app.delete("/users/:id", (req, res) => {
  let id = req.params["id"];
  let deleted = userServices
    .deleteUser(id)
    .then((deleted) =>
      deleted === undefined
        ? res.status(404).send("Resource not found")
        : res.status(204).send()
    );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/users", (req, res) => {
//   console.log("WE GOT HEREEE");
//   const name = req.query.name;
//   if (name != undefined) {
//     let result = userServices
//       .findUserByName(name)
//       .then((result = { users_list: result }));

//     // result = { users_list: result };
//     res.send(result);
//   } else {
//     res.send(users);
//   }
// });

app.get("/users/:id", (req, res) => {
  const id = req.params.id; //or req.params.id
  try {
    let result = userServices
      .findUserById(id)
      .then((result) =>
        result === undefined
          ? res.status(404).send("Resource not found")
          : res.send(result)
      )
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
  // if (result === undefined) {
  //   res.status(404).send("Resource not found.");
  // } else {
  //   res.send(result);
  // }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (userToAdd === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    console.log(userToAdd);
    // userToAdd.id = generateUserID();
    userServices.addUser(userToAdd).then(res.status(201).send(userToAdd));
    // res.status(201).send(userToAdd);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
