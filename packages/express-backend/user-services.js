import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(name, job) {
  console.log("GET USERS");
  let promise;
  if (name === undefined && job === undefined) {
    console.log("USERMODELFIND");
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (job && name) {
    promise = findUserByJobAndName(name, job);
  }
  return await promise;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
  }
}

async function addUser(user) {
  const userToAdd = new userModel(user);
  console.log("id " + userToAdd._id);
  userToAdd.id = userToAdd._id;
  const promise = userToAdd.save();
  //   userToAdd.id = userToAdd._id;

  return await promise;
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

async function findUserByJobAndName(name, job) {
  return await userModel.find({ name: name }).find({ job: job });
}

async function deleteUser(id) {
  return await userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByJobAndName,
  deleteUser,
};
