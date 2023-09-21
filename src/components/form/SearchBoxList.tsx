import { Client } from '@/models/Client'

interface SearchBoxListProps {
  filteredList: Client[]
  setName(name: string): void
}

export function SearchBoxList({ filteredList, setName }: SearchBoxListProps) {
  function handleSetName(name: string) {
    setName(name)
  }

  return (
    <div className="relative">
      <div className="absolute bg-white w-full top-full border-2 focus:outline-none rounded border-secondary/60">
        <ul>
          {filteredList.map((client) => (
            <li
              className="hover:bg-gray-200 px-3 py-2 cursor-pointer"
              key={client.id}
              onClick={() => console.log(client.name)}
            >
              <button onClick={() => handleSetName(client.name)}>
                {client.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
