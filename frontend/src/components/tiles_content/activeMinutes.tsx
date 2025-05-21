interface ActiveMinutesProps {
  data: number | null
}

export function ActiveMinutes({ data }: ActiveMinutesProps) {
    if (data === null) {
        return (
            <div className="flex flex-col items-center">
            <p className="text-xl">Not data found</p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center">
            <h1 className="text-6xl text-green-400">{data}</h1>
            <p className="text-2xl">Active Minutes</p>
            </div>
        )
    }
}

