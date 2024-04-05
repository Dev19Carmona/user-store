import mongoose, { Schema } from 'mongoose'
const modelName = 'Category'
const schema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is Required'] },
  available: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export const CategoryModel = mongoose.model(modelName, schema)
