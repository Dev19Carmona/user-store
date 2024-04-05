import mongoose, { Schema } from 'mongoose'
const modelName = 'Product'
const schema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is Required'], unique: true },
  description: { type: String },
  price: { type: Number, default: 0 },
  available: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
})

export const ProductModel = mongoose.model(modelName, schema)
