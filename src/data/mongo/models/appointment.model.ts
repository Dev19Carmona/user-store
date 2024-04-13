import mongoose, { Schema } from 'mongoose'
const modelName = 'Appointment'
const schema = new mongoose.Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, {
    timestamps: true
})
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id
    },
})
export const CategoryModel = mongoose.model(modelName, schema)
