export class AnamnesisTypeEnum {
  static FACIAL = 'Facial'
  static BODY = 'Corporal'
  static LASH_LIFTH = 'LASH_LIFTH'
  static EYEBROW = 'EYEBROW'

  static getKey(value: AnamnesisTypeEnum | undefined) {
    const index = Object.values(AnamnesisTypeEnum).indexOf(value)
    return Object.keys(AnamnesisTypeEnum)[index]
  }

  static getValue(key: string | undefined) {
    if (key === undefined) return ''
    const index = Object.keys(AnamnesisTypeEnum).indexOf(key)
    return Object.values(AnamnesisTypeEnum)[index]
  }

  static get(value: AnamnesisTypeEnum) {
    return value
  }
}
