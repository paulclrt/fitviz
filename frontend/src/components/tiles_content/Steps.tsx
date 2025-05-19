interface StepsProps {
  data: number
}

export function Steps({ data }: StepsProps) {
  return (
    <div>
      <h1>{data}</h1>
      <p>Steps</p>
    </div>
  )
}

