interface ActiveMinutesProps {
  data: number
}

export function ActiveMinutes({ data }: ActiveMinutesProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl text-green-400">{data}</h1>
      <p className="text-2xl">Active Minutes</p>
    </div>
  )
}

