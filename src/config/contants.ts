export class Constants {
  static roles() {
    return Object.freeze({
      admin: { id: 1, key: 'ADMIN_ROLE', name: 'admin' },
      user: { id: 2, key: 'USER_ROLE', name: 'user' },
      collaborator: { id: 3, key: 'COLLABORATOR_ROLE', name: 'collaborator' },
      doctor: { id: 4, key: 'DOCTOR_ROLE', name: 'doctor' },
    })
  }
  static appointmentStatuses() {
    return Object.freeze({
      pending: { id: 1, key: 'pending', name: 'pending' },
      confirmed: { id: 1, key: 'confirmed', name: 'confirmed' },
      cancelled: { id: 1, key: 'cancelled', name: 'cancelled' },
    })
  }
  
}
