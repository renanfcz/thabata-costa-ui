export class PaymentTypeEnum {
  static MONEY = 'Dinheiro'
  static PIX = 'Pix'
  static DEBIT = 'Débito'
  static CREDIT = 'Crédito'

  static getKey(value: PaymentTypeEnum | undefined) {
    const index = Object.values(PaymentTypeEnum).indexOf(value)
    return Object.keys(PaymentTypeEnum)[index]
  }

  static getValue(key: string | undefined) {
    if (key === undefined) return ''
    const index = Object.keys(PaymentTypeEnum).indexOf(key)
    return Object.values(PaymentTypeEnum)[index]
  }

  static get(value: PaymentTypeEnum) {
    return value
  }
}
