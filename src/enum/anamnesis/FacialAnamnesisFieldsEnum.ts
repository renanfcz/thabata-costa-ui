export class FacialAnamnesisFieldsEnum {
  static hasMedicalTreatment = 'Está em tratamento médico?'
  static hasMedicalTreatmentJustification = 'Qual?'
  static useAnyMedication = 'Usa algum medicamento?'
  static useAnyMedicationJustification = 'Qual?'
  static hasDermatite = 'Tem alguma dermatite?'
  static hasDermatiteJustification = 'Onde?'
  static constipation = 'Constipação intestinal?'
  static cardiac = 'Cardiaco(a)?'
  static vascular = 'Vasculares?'
  static hasAllergy = 'Tem algum tipo de alergia?'
  static hasAllergyJustification = 'Ao que?'
  static hasEpilepsy = 'Tem epilepsia/convulsões?'
  static rheumatic = 'Reumática?'
  static herpes = 'Herpes?'
  static herpesJustification = 'Usa qual medicamento para herpes?'
  static water = 'Ingestão de água:'
  static pressureLevels = 'Níveis pressóricos:'
  static diet = 'Alimentação:'
  static smoker = 'É tabagista?'
  static regularIntestine = 'Funcionamento intestinal regular?'
  static diu = 'DIU?'
  static pregnant = 'Está gestante?'
  static bronchitis = 'Bronquite?'
  static hypertension = 'Hipertensão?'
  static injuries = 'Lesões?'
  static menstrualCycle = 'Ciclo menstrual regular?'
  static oncologicalHistory = 'Antecedentes oncológicos?'
  static previousAestheticTreatment = 'Procedimentos estéticos anteriores?'

  static getKey(value: FacialAnamnesisFieldsEnum | undefined) {
    const index = Object.values(FacialAnamnesisFieldsEnum).indexOf(value)
    return Object.keys(FacialAnamnesisFieldsEnum)[index]
  }

  static getValue(key: string | undefined) {
    if (key === undefined) return ''
    const index = Object.keys(FacialAnamnesisFieldsEnum).indexOf(key)
    return Object.values(FacialAnamnesisFieldsEnum)[index]
  }

  static get(value: FacialAnamnesisFieldsEnum) {
    return value
  }
}
