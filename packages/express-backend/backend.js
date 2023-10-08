import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

let users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
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
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    let result = findUserByJobAndName(job, name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.delete("/users/:id", (req, res) => {
  let id = req.params["id"];
  let deleted = deleteUser(id);
  if (deleted === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
    console.log("backend chars");
    console.log(users);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (userToAdd === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    console.log(userToAdd);
    userToAdd.id = generateUserID();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
