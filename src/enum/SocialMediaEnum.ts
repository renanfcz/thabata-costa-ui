export class SocialMediaEnum {
    static FACEBOOK = 'Facebook'
    static INSTAGRAM = 'Instagram'

    static getKey(value: string | undefined) {
      const index = Object.values(SocialMediaEnum).indexOf(value)
      return Object.keys(SocialMediaEnum)[index]
    }

    static getValue(key: string | undefined) {
      if(key === undefined)
        return ""
      const index = Object.keys(SocialMediaEnum).indexOf(key)
      return Object.values(SocialMediaEnum)[index]
    }
  }