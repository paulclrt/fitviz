interface DistanceProps {
  data: number
}

export function Distance({ data }: DistanceProps) {
  return (
    <div>
      <h1>{data.toFixed(2)}</h1>
      <p>km</p>
    </div>
  )
}

