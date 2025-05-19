interface FloorsProps {
  data: number
}

export function Floors({ data }: FloorsProps) {
  return (
    <div>
      <h1>{data}</h1>
      <p>Floors</p>
    </div>
  )
}

