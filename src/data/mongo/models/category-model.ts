import mongoose, { Schema } from 'mongoose'
const modelName = 'Category'
const schema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is Required'], unique: true },
  available: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret, options) {
    delete ret._id
  },
})
export const CategoryModel = mongoose.model(modelName, schema)
