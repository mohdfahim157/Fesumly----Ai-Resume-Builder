import type { SkillGap } from '../../types/interview';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function SkillsGap({ skills }: { skills: SkillGap[] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Critical Skill Gaps</h3>
      <div className="space-y-3">
        {skills.map((s, idx) => {
          
          let colorClass = "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800";
          let Icon = Info;
          
          if (s.severity === 'high') {
            colorClass = "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800";
            Icon = AlertTriangle;
          } else if (s.severity === 'medium') {
            colorClass = "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
            Icon = AlertCircle;
          }

          return (
            <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${colorClass}`}>
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span className="font-medium text-sm">{s.skill}</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 px-2 py-1 rounded bg-white/50 dark:bg-black/20">
                {s.severity} Severity
              </span>
            </div>
          )
        })}
      </div>
    </div>
  );
}
