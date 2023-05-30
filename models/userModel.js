
const mongoose = require("mongoose");

// {
//     _id: ObjectId,
//     name: String,
//     email: String,
//     password: String
//   }

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const UserModel = mongoose.model("users", UserSchema);

module.exports = {
    UserModel
}

