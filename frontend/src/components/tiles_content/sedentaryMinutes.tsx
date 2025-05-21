interface SedentaryProps {
  data: number | null
}

export function Sedentary({ data }: SedentaryProps) {

    if (data === null) {
        return (
            <div className="flex flex-col items-center">
            <p className="text-xl">No data found</p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center">
            <h1 className="text-4xl text-gray-300">{data}</h1>
            <p className="text-2xl">Sedentary Minutes</p>
            </div>
        )
    }
}

