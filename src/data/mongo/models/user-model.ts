import mongoose from 'mongoose'
const modelName = 'User'
const schema = new mongoose.Schema({
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
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret, options) {
    delete ret._id
    // delete ret.password
  },
})
export const UserModel = mongoose.model(modelName, schema)
