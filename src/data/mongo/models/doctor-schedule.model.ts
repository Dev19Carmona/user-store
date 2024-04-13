import mongoose, { Schema } from 'mongoose';

const modelName = 'DoctorSchedule';

const schema = new mongoose.Schema({
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al doctor al que pertenece este horario
    dayOfWeek: { type: Number, required: true }, // Día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)
    startTime: { type: String, required: true }, // Hora de inicio de las citas (en formato HH:mm)
    endTime: { type: String, required: true }, // Hora de fin de las citas (en formato HH:mm)
    interval: { type: Number, required: true }, // Intervalo de tiempo entre citas (en minutos)
    maxAppointmentsPerSlot: { type: Number, default: 1 }, // Máximo de citas por intervalo
    schedule: { type: [Schema.Types.ObjectId], ref: 'Appointment' }, //TODO Doctors
}, { timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});

export const DoctorScheduleModel = mongoose.model(modelName, schema);
