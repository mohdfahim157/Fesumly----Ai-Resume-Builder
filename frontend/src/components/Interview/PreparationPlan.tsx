import type { PreparationTask } from '../../types/interview';
import { CalendarDays, CheckCircle } from 'lucide-react';

export default function PreparationPlan({ plan }: { plan: PreparationTask[] }) {
  if (!plan || plan.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        <CalendarDays className="text-green-500" /> Action Plan
      </h3>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
        {plan.map((dayPlan, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon marker */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-green-100 dark:bg-green-900/50 text-green-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <span className="font-bold text-sm">{dayPlan.day}</span>
            </div>
            
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">Day {dayPlan.day}: {dayPlan.focus}</h4>
              </div>
              <ul className="space-y-2 mt-3">
                {dayPlan.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="leading-tight">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
