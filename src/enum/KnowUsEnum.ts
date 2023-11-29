export class KnowUsEnum {
    static FACEBOOK = 'Facebook'
    static INSTAGRAM = 'Instagram'
    static INDICATION = 'Indicação'

    static getKey(value: string | undefined) {
      const index = Object.values(KnowUsEnum).indexOf(value)
      return Object.keys(KnowUsEnum)[index]
    }

    static getValue(key: string | undefined) {
      if(key === undefined)
        return ""
      const index = Object.keys(KnowUsEnum).indexOf(key)
      return Object.values(KnowUsEnum)[index]
    }
  }