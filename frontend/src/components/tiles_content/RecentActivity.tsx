interface Activity {
  name: string
  calories: number
}

interface RecentActivityProps {
  data: Activity[]
}

export default function RecentActivity({ data }: RecentActivityProps) {
  if (data.length === 0) {
    return (
      <div>
        <h2>Recent Activity</h2>
        <p>No recent activities logged.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Recent Activity</h2>
      <ul>
        {data.map((activity, index) => (
          <li key={index}>
            {activity.name} — {activity.calories} kcal
          </li>
        ))}
      </ul>
    </div>
  )
}

