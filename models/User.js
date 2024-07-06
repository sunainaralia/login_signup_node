import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
})

const UserModel = mongoose.model('Users', UserSchema)

export default UserModel