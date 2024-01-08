export class SessionStatusEnum {
  static SCHEDULED = 'Agendado'
  static CANCELED = 'Cancelado'
  static FINISHED = 'Finalizada'

  static getKey(value: string | undefined) {
    const index = Object.values(SessionStatusEnum).indexOf(value)
    return Object.keys(SessionStatusEnum)[index]
  }

  static getValue(key: string | undefined) {
    if (key === undefined) return ''
    const index = Object.keys(SessionStatusEnum).indexOf(key)
    return Object.values(SessionStatusEnum)[index]
  }
}
