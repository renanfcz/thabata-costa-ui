import { Anamnesis } from '@/models/Anamnesis'

interface AnamnesisCardProps {
  anamnesis: Anamnesis
}

export default function AnamnesisCard({ anamnesis }: AnamnesisCardProps) {
  return (
    <div className="flex flex-col border-2 border-primary rounded gap-5 shadow-md cursor-pointer">
      <div className="flex justify-between bg-primary items-center p-2">
        <strong className="text-white text-xl">{anamnesis.type}</strong>
        <span className="rounded-full bg-white w-4 h-4"></span>
      </div>
      <div className="p-4 flex flex-col gap-5"></div>
    </div>
  )
}
