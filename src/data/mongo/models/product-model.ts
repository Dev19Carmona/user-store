import mongoose, { Schema } from 'mongoose'
const modelName = 'Product'
const schema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is Required'], unique: true },
  description: { type: String },
  price: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret, options) {
    delete ret._id
  },
})

export const ProductModel = mongoose.model(modelName, schema)
