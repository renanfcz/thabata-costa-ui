import JustificationInput from '@/components/form/inputs/JustificationInput'
import RadioButtonCustomChoices from '@/components/form/inputs/RadioButtonCustomChoices'
import RadioButtonSimpleChoice from '@/components/form/inputs/RadioButtonSimpleChoice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  hasMedicalTreatment: z.string(),
  hasMedicalTreatmentJustification: z.string().max(50).optional(),
  useAnyMedication: z.string(),
  useAnyMedicationJustification: z.string().max(50).optional(),
  hasDermatite: z.string(),
  hasDermatiteJustification: z.string().max(50).optional(),
  constipation: z.string(),
  cardiac: z.string(),
  vascular: z.string(),
  hasAllergy: z.string(),
  hasAllergyJustification: z.string().max(50).optional(),
  hasEpilepsy: z.string(),
  rheumatic: z.string(),
  herpes: z.string(),
  herpesJustification: z.string(),
  water: z.string(),
  pressureLevels: z.string(),
  diet: z.string(),
  smoker: z.string(),
  regularIntestine: z.string(),
  diu: z.string(),
  pregnant: z.string(),
  bronchitis: z.string(),
  hypertension: z.string(),
  injuries: z.string(),
  menstrualCycle: z.string(),
  oncologicalHistory: z.string(),
  previousAestheticTreatment: z.string(),
})

type FacialAnamnesisFormData = z.infer<typeof schema>

export default function FacialAnamnesisForm() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<FacialAnamnesisFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const waterIntake = ['-1L', '1-2L', '2-3L', '+3L']
  const pressureLevels = ['Elevada', 'Normal', 'Baixa']
  const diet = ['Controlada', 'Irregular', 'Normal', 'Vegetariana']

  async function handleSaveAnamnesis(input: FacialAnamnesisFormData) {
    // TODO
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSaveAnamnesis)}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-2">
          <Controller
            name="hasMedicalTreatment"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">
                    Está em tratamento médico?
                  </span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          {getValues('hasMedicalTreatment') === 'Sim' && (
            <Controller
              name="hasMedicalTreatmentJustification"
              control={control}
              render={({ field: { onChange } }) => (
                <JustificationInput
                  text="Qual?"
                  setValue={onChange}
                  hasError={!!errors.hasMedicalTreatmentJustification}
                  isDirty={!!dirtyFields.hasMedicalTreatmentJustification}
                />
              )}
            />
          )}
          <Controller
            name="useAnyMedication"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Usa algum medicamento?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          {getValues('useAnyMedication') === 'Sim' && (
            <Controller
              name="useAnyMedicationJustification"
              control={control}
              render={({ field: { onChange } }) => (
                <JustificationInput
                  text="Qual?"
                  setValue={onChange}
                  hasError={!!errors.useAnyMedicationJustification}
                  isDirty={!!dirtyFields.useAnyMedicationJustification}
                />
              )}
            />
          )}
          <Controller
            name="hasDermatite"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Tem alguma dermatite?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          {getValues('hasDermatite') === 'Sim' && (
            <Controller
              name="hasDermatiteJustification"
              control={control}
              render={({ field: { onChange } }) => (
                <JustificationInput
                  text="Onde?"
                  setValue={onChange}
                  hasError={!!errors.hasDermatiteJustification}
                  isDirty={!!dirtyFields.hasDermatiteJustification}
                />
              )}
            />
          )}
          <Controller
            name="constipation"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Constipação intestinal?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="cardiac"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Cardiaco(a)?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="vascular"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Vasculares?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="hasAllergy"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">
                    Tem algum tipo de alergia?
                  </span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          {getValues('hasAllergy') === 'Sim' && (
            <Controller
              name="hasAllergyJustification"
              control={control}
              render={({ field: { onChange } }) => (
                <JustificationInput
                  text="Ao que?"
                  setValue={onChange}
                  hasError={!!errors.hasAllergyJustification}
                  isDirty={!!dirtyFields.hasAllergyJustification}
                />
              )}
            />
          )}
          <Controller
            name="hasEpilepsy"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Tem epilepsia/convulsões?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="rheumatic"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Reumática?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="herpes"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Herpes?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          {getValues('herpes') === 'Sim' && (
            <Controller
              name="herpesJustification"
              control={control}
              render={({ field: { onChange } }) => (
                <JustificationInput
                  text="Usa qual medicamento para herpes?"
                  setValue={onChange}
                  hasError={!!errors.herpesJustification}
                  isDirty={!!dirtyFields.herpesJustification}
                />
              )}
            />
          )}
          <Controller
            name="water"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Ingestão de água:</span>
                </div>
                <RadioButtonCustomChoices
                  setValue={onChange}
                  choices={waterIntake}
                />
              </div>
            )}
          />
          <Controller
            name="pressureLevels"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Níveis pressóricos:</span>
                </div>
                <RadioButtonCustomChoices
                  setValue={onChange}
                  choices={pressureLevels}
                />
              </div>
            )}
          />
          <Controller
            name="diet"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Alimentação:</span>
                </div>
                <RadioButtonCustomChoices setValue={onChange} choices={diet} />
              </div>
            )}
          />
          <Controller
            name="smoker"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">É tabagista?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="regularIntestine"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">
                    Funcionamento intestinal regular?
                  </span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="diu"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">DIU?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="pregnant"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Está gestante?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="bronchitis"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Bronquite?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="hypertension"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Hipertensão?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="injuries"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Lesões?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="menstrualCycle"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Ciclo menstrual regular?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="oncologicalHistory"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">Antecedentes oncológicos?</span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
          <Controller
            name="previousAestheticTreatment"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">
                    Procedimentos estéticos anteriores?
                  </span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
        </div>
      </form>
    </div>
  )
}
