interface Zone {
  name: string
  minutes: number
}

interface HeartRateZonesProps {
  zones: Zone[] | null
}

export function HeartRateZones({ zones }: HeartRateZonesProps) {
    if (zones === null) {
        return (
            <div className="text-xl">
            <h2 className="text-2xl font-bold ">Heart Zones</h2>
            <p>No data found</p>
            </div>
        )
    } else {
        return (
            <div className="text-xl">
            <h2 className="text-2xl font-bold ">Heart Zones</h2>
            <ul>
            {zones.map((zone, index) => (
                <li key={index}>
                <span className="font-semibold">{zone.name}</span>: {zone.minutes} min
                </li>
            ))}
            </ul>
            </div>
        )
    }
}

