import { Anamnesis } from '@/models/Anamnesis'

interface AnamnesisPageDetailProps {
  anamnesis: Anamnesis | undefined
}

export default function AnamnesisPageDetail({
  anamnesis,
}: AnamnesisPageDetailProps) {
  return (
    <div>
      <div>
        <h1>{anamnesis?.type}</h1>
      </div>
      <div>
        {anamnesis?.anamnesisFields.map((field) => (
          <div key={field.id}>
            <span>{field.question}</span>
            <span>{field.answer}</span>
            <span>{field.justification}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
