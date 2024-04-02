import mongoose from 'mongoose'
const modelName = 'User'
const Schema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is Required'] },
  email: { type: String, required: [true, 'email is Required'], unique: true },
  emailValidated: { type: Boolean, default: false },
  password: { type: String, required: [true, 'password is Required'] },
  img: { type: String },
  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
})

export const UserModel = mongoose.model(modelName, Schema)
