interface SedentaryProps {
  data: number
}

export function Sedentary({ data }: SedentaryProps) {
  return (
    <div>
      <h1>{data}</h1>
      <p>Sedentary Minutes</p>
    </div>
  )
}

