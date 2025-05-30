import "./recentActivities.css"
import { RecentActivityData } from "../datatype/Activities"

interface RecentActivityProps {
    data: RecentActivityData | null;
}

export default function RecentActivity({ data }: RecentActivityProps) {
if (!data || data.activities.length === 0) {
    return (
      <div>
        <p>No recent activities logged.</p>
      </div>
    );
  }

  // TODO FIX OVERFLOW PB
  return (
    <div className="overflow-scroll">
      <ul>
        {data.activities.map((activity) => (
          <li key={activity.logId} className="activity-item">
            <div className="header">
              <h3>{activity.activityName}</h3>
              <span>{(activity.calories).toFixed(0)} kcal</span>
            </div>
            <div className="details">
              <p>
                <strong>Duration:</strong>{" "}
                {(activity.duration / 60000).toFixed(1)} min
              </p>
              <p>
                <strong>Steps:</strong> {activity.steps}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(activity.startTime).toLocaleString()}
              </p>
              <p>
                <strong>Activity Levels:</strong>{" "}
                {activity.activityLevel
                  .map((level) => `${level.name} (${level.minutes} min)`)
                  .join(", ")}
              </p>
              <a href={activity.tcxLink} target="_blank" rel="noreferrer">
                Download TCX
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

