interface FloorsProps {
  data: number | null
}

export function Floors({ data }: FloorsProps) {
    if (data === null) {
        return (
            <div className="flex flex-col items-center">
            <p className="text-xl">No data found</p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center">
            <h1 className="text-6xl">{data}</h1>
            <p className="text-2xl">Floors Climbed</p>
            </div>
        )
    }
}

