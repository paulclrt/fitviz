interface FloorsProps {
  data: number
}

export function Floors({ data }: FloorsProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl">{data}</h1>
      <p className="text-2xl">Floors Climbed</p>
    </div>
  )
}

