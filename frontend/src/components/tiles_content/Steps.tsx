

interface StepsProps {
  data: number | null
  goal: number | null
}

export function Steps({ data, goal }: StepsProps) {
  const radius = 80
  const stroke = 10
  const normalizedRadius = radius - stroke * 0.5
  var progress : number;
  const circumference = normalizedRadius * 2 * Math.PI
  var strokeDashoffset : number;

  if (goal === null) { goal = 10000 };

  if (data === null) {
      return (
          <div className="flex flex-col items-center">
          <svg height={radius * 2} width={radius * 2}>
          <circle
          stroke="#2e3a59"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          />
          <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="32"
          >
          0
          </text>
          </svg>
          <p>Steps</p>
          </div>
      )
  } else {
      progress = Math.min(data / goal, 1)
      strokeDashoffset = circumference - progress * circumference
      return (
          <div className="flex flex-col items-center">
          <svg height={radius * 2} width={radius * 2}>
          <circle
          stroke="#2e3a59"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          />
          <circle
          stroke="#00d084"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          />
          <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="32"
          >
          {data}
          </text>
          </svg>
          <p>Steps</p>
          </div>
      )
  }
}
