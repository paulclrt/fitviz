interface DistanceProps {
  data: number | null
}

export function Distance({ data }: DistanceProps) {
    if (data == null) {
        return (
            <div className="flex flex-col items-center">
            <p className="text-xl">No data found</p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center">
            <h1 className="text-6xl">{data.toFixed(2)}</h1>
            <p className="text-2xl">km Walked</p>
            </div>
        )
    }
}

