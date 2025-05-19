interface Zone {
  name: string
  minutes: number
}

interface HeartRateZonesProps {
  zones: Zone[]
}

export function HeartRateZones({ zones }: HeartRateZonesProps) {
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

