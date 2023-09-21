'use client'
import { Procedure } from '@/models/Procedure'
import { graphqlClient } from '@/server/graphql-client'
import { GET_PROCEDURES } from '@/server/queries'
import { createContext, useContext, useEffect, useState } from 'react'

interface ProceduresContextType {
  procedures: Procedure[]
  updateProcedures(procedures: Procedure[]): void
}

interface ResponseGetProcedures {
  findAllProcedures: [Procedure]
}

const ProceduresContext = createContext({} as ProceduresContextType)

export const useProceduresContext = () => useContext(ProceduresContext)

export const ProceduresProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [procedures, setProcedures] = useState<Procedure[]>([])

  const updateProcedures = (procedures: Procedure[]) => {
    setProcedures(procedures)
  }

  async function getProcedures() {
    if (procedures.length === 0) {
      const response = await graphqlClient.request<ResponseGetProcedures>(
        GET_PROCEDURES,
      )

      updateProcedures(response.findAllProcedures)
    }
  }

  useEffect(() => {
    getProcedures()
  }, [])

  return (
    <ProceduresContext.Provider value={{ procedures, updateProcedures }}>
      {children}
    </ProceduresContext.Provider>
  )
}
