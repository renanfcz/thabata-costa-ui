import JustificationInput from '@/components/form/inputs/JustificationInput'
import RadioButtonCustomChoices from '@/components/form/inputs/RadioButtonCustomChoices'
import RadioButtonSimpleChoice from '@/components/form/inputs/RadioButtonSimpleChoice'
import { useClientContext } from '@/contexts/client/ClientContext'
import { FacialAnamnesisFieldsEnum } from '@/enum/anamnesis/FacialAnamnesisFieldsEnum'
import { AnamnesisTypeEnum } from '@/enum/anamnesis/AnamnesisTypeEnum'
import { graphqlClient } from '@/server/graphql-client'
import { CREATE_ANAMNESIS } from '@/server/mutations/requests/anamnesis/AnamnesisMutations'
import { ResponseCreateAnamnesis } from '@/server/mutations/responses/AnamnesisResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

interface FacialAnamnesisFormProps {
  closeForm(): void
}

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
  herpesJustification: z.string().optional(),
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

export type FacialAnamnesisFormData = z.infer<typeof schema>

export default function FacialAnamnesisForm({
  closeForm,
}: FacialAnamnesisFormProps) {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<FacialAnamnesisFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  const waterIntake = ['-1L', '1-2L', '2-3L', '+3L']
  const pressureLevels = ['Elevada', 'Normal', 'Baixa']
  const diet = ['Controlada', 'Irregular', 'Normal', 'Vegetariana']

  const { client, updateClient } = useClientContext()

  async function handleSaveAnamnesis(input: FacialAnamnesisFormData) {
    try {
      const data = await graphqlClient.request<ResponseCreateAnamnesis>(
        CREATE_ANAMNESIS,
        {
          createAnamnesisInput: {
            protocolType: AnamnesisTypeEnum.FACIAL,
            clientId: client?.id,
            data: JSON.stringify(input),
          },
        },
      )
      const updatedClient = { ...client! }
      updatedClient.anamnesis.push(data.createAnamnesis)
      updateClient(updatedClient)
      toast.success('Anamnese criada com sucesso!')
      closeForm()
    } catch (e) {
      toast.error('Ocorreu um erro ao salvar os dados da anamnese!')
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSaveAnamnesis)}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <Controller
            name="hasMedicalTreatment"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex">
                <div className="flex w-full items-center">
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.hasMedicalTreatment}
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
                  text={
                    FacialAnamnesisFieldsEnum.hasMedicalTreatmentJustification
                  }
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.useAnyMedication}
                  </span>
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
                  text={FacialAnamnesisFieldsEnum.useAnyMedicationJustification}
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.hasDermatite}
                  </span>
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
                  text={FacialAnamnesisFieldsEnum.hasDermatiteJustification}
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.constipation}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.cardiac}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.vascular}
                  </span>
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
                    {FacialAnamnesisFieldsEnum.hasAllergy}
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
                  text={FacialAnamnesisFieldsEnum.hasAllergyJustification}
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.hasEpilepsy}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.rheumatic}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.herpes}
                  </span>
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
                  text={FacialAnamnesisFieldsEnum.herpesJustification}
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.water}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.pressureLevels}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.diet}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.smoker}
                  </span>
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
                    {FacialAnamnesisFieldsEnum.regularIntestine}
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.diu}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.pregnant}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.bronchitis}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.hypertension}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.injuries}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.menstrualCycle}
                  </span>
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
                  <span className="text-center">
                    {FacialAnamnesisFieldsEnum.oncologicalHistory}
                  </span>
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
                    {FacialAnamnesisFieldsEnum.previousAestheticTreatment}
                  </span>
                </div>
                <RadioButtonSimpleChoice setValue={onChange} />
              </div>
            )}
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200 w-full"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
