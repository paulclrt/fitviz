interface Zone {
  name: string
  minutes: number
}

interface HeartRateZonesProps {
  zones: Zone[]
}

export function HeartRateZones({ zones }: HeartRateZonesProps) {
  return (
    <div>
      <h2>Heart Rate Zones</h2>
      <ul>
        {zones.map((zone, index) => (
          <li key={index}>
            {zone.name}: {zone.minutes} min
          </li>
        ))}
      </ul>
    </div>
  )
}

