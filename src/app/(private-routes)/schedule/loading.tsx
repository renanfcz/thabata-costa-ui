'use client'
import { Oval } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Oval
        height={40}
        width={40}
        color="#2563eb"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#2563eb"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  )
}
