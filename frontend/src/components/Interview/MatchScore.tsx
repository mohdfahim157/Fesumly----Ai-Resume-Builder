

export default function MatchScore({ score, title }: { score: number, title: string }) {
  // Determine color based on score
  let color = '#22c55e'; // green
  if (score < 50) color = '#ef4444'; // red
  else if (score < 75) color = '#eab308'; // yellow

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Profile Match</h2>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 -mt-2">for {title}</p>
      
      <div className="w-32 h-32 relative">
         <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              style={{ stroke: color }}
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="fill-gray-800 dark:fill-gray-100 font-bold text-xs" textAnchor="middle">
              {score}%
            </text>
         </svg>
      </div>
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 max-w-[200px]">
        Based on your skills and experience vs the job requirements.
      </p>
    </div>
  );
}
