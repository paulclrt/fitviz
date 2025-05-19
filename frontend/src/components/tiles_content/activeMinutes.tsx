interface ActiveMinutesProps {
  data: number
}

export function ActiveMinutes({ data }: ActiveMinutesProps) {
  return (
    <div>
      <h1>{data}</h1>
      <p>Active Minutes</p>
    </div>
  )
}

