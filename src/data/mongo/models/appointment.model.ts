import mongoose, { Schema } from 'mongoose'
const modelName = 'Appointment'
const schema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startFullYear: { type: Number, required: true },
    endFullYear: { type: Number, required: true },
    startDayNumber: { type: Number, required: true },
    endDayNumber: { type: Number, required: true },
    startHour: { type: Number, required: true },
    endHour: { type: Number, required: true },
    startMinuts: { type: Number, required: true },
    endMinuts: { type: Number, required: true },
    startSeconds: { type: Number, required: true },
    endSeconds: { type: Number, required: true },
    startMs: { type: Number, required: true },
    endMs: { type: Number, required: true },
    intervalInMilliseconds: { type: Number, required: true },
    intervalInSeconds: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id
  },
})
schema.pre('save', async function (next) {
  try {
    if (this.startDate >= this.endDate) {
      throw new Error('Start date must be before end date.')
    }
    // Validar que la cita no esté fuera del horario permitido
    const startHour = this.startDate.getHours()
    const endHour = this.endDate.getHours()
    if (startHour < 8 || endHour > 18) {
      throw new Error('Appointments must be scheduled between 8:00 and 18:00.')
    }
    const existingAppointment = await AppointmentModel.findOne({
      doctor: this.doctor,
      $or: [
        {
          $and: [
            { startDate: { $lte: this.startDate } },
            { endDate: { $gte: this.startDate } },
          ],
        },
        {
          $and: [
            { startDate: { $lte: this.endDate } },
            { endDate: { $gte: this.endDate } },
          ],
        },
        {
          $and: [
            { startDate: { $gte: this.startDate } },
            { endDate: { $lte: this.endDate } },
          ],
        },
      ],
    })

    if (existingAppointment) {
      throw new Error('Doctor already has an appointment during this time.')
    }

    next()
  } catch (error) {
    throw `${error}`
  }
})

export const AppointmentModel = mongoose.model(modelName, schema)
