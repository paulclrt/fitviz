interface SedentaryProps {
  data: number
}

export function Sedentary({ data }: SedentaryProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-gray-300">{data}</h1>
      <p className="text-2xl">Sedentary Minutes</p>
    </div>
  )
}

