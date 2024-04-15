export class AppointmentDateCreateDto {
  private constructor(
    public readonly start: Date,
    public readonly end: Date,
    public readonly startFullYear: number,
    public readonly endFullYear: number,
    public readonly startDayNumber: number,
    public readonly endDayNumber: number,
    public readonly startHour: number,
    public readonly endHour: number,
    public readonly startMinuts: number,
    public readonly endMinuts: number,
    public readonly startSeconds: number,
    public readonly endSeconds: number,
    public readonly startMs: number,
    public readonly endMs: number,
    public readonly intervalInMilliseconds: number,
    public readonly intervalInSeconds: number
  ) {}

  static create(startDate: Date, endDate: Date): AppointmentDateCreateDto {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const startFullYear = start.getFullYear()
    const endFullYear = end.getFullYear()
    const startDayNumber = start.getDate()
    const endDayNumber = end.getDate()
    const startHour = start.getHours()
    const endHour = end.getHours()
    const startMinuts = start.getMinutes()
    const endMinuts = end.getMinutes()
    const startSeconds = start.getSeconds()
    const endSeconds = end.getSeconds()
    const startMs = start.getTime()
    const endMs = end.getTime()
    const intervalInMilliseconds = endMs - startMs
    const intervalInSeconds = intervalInMilliseconds / 1000
    return new AppointmentDateCreateDto(
      start,
      end,
      startFullYear,
      endFullYear,
      startDayNumber,
      endDayNumber,
      startHour,
      endHour,
      startMinuts,
      endMinuts,
      startSeconds,
      endSeconds,
      startMs,
      endMs,
      intervalInMilliseconds,
      intervalInSeconds
    )
  }
}
