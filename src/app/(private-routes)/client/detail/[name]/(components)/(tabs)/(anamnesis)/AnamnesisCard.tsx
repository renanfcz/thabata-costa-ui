import { Anamnesis } from '@/models/Anamnesis'
import { dateFormatter } from '@/utils/formatter'

interface AnamnesisCardProps {
  anamnesis: Anamnesis
}

export default function AnamnesisCard({ anamnesis }: AnamnesisCardProps) {
  return (
    <div className="flex flex-col border-2 border-gray-600 rounded gap-5 shadow-md cursor-pointer">
      <div className="flex justify-between bg-gray-600 items-center p-2">
        <strong className="text-white text-xl">{anamnesis.protocolType}</strong>
        <span className="rounded-full bg-white w-4 h-4"></span>
      </div>
      <div className="p-4 flex flex-col gap-5">
        <div>
          <span>Status: </span>
          {anamnesis.signedIn ? (
            <span className="text-success font-bold">Assinada</span>
          ) : (
            <span className="text-danger font-bold">Não assinada</span>
          )}
        </div>
        {anamnesis.signedIn && (
          <div>
            <span>Assinado em: </span>
            <span>{dateFormatter.format(new Date(anamnesis.signedIn))}</span>
          </div>
        )}
        {anamnesis.expriresIn && (
          <div>
            <span>Data de expiração: </span>
            <span>{dateFormatter.format(new Date(anamnesis.expriresIn))}</span>
          </div>
        )}
      </div>
    </div>
  )
}
