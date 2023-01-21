import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: {type: String, unique: true, reqired: true},
  password: {type: String,  reqired: true},
  roles: [{type: String, ref: "Role"}],
})


export default mongoose.model("User", User)