interface SedentaryProps {
  data: number | null
}


function FormatTimeData(data: number | null): string {
    if (data === null) {
        return "";
    } else {
        const hours: number = Math.floor(data / 60);
        const minutes: number = Math.floor(data % 60);
        if (minutes == 0) {
            return `${hours}h`
        } else {
            return `${hours}h ${minutes}`
        }
    }
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
            <h1 className="text-4xl text-gray-300">{FormatTimeData(data)}</h1>
            <p className="text-2xl">Sedentary Minutes</p>
            </div>
        )
    }
}

