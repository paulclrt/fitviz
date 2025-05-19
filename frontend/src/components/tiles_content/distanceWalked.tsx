interface DistanceProps {
  data: number
}

export function Distance({ data }: DistanceProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl">{data.toFixed(2)}</h1>
      <p className="text-2xl">km Walked</p>
    </div>
  )
}

