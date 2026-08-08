import { useState } from 'react';
import type { Question } from '../../types/interview';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function QuestionList({ title, questions }: { title: string, questions: Question[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`border rounded-xl transition-colors duration-200 ${isOpen ? 'border-green-400 dark:border-green-600' : 'border-gray-200 dark:border-gray-700'}`}>
              <button 
                onClick={() => toggleOpen(idx)}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full w-6 h-6 shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <p className={`font-medium text-sm md:text-base ${isOpen ? 'text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
                    {q.question}
                  </p>
                </div>
                {isOpen ? <ChevronUp className="text-gray-400 shrink-0 ml-2" size={20} /> : <ChevronDown className="text-gray-400 shrink-0 ml-2" size={20} />}
              </button>
              
              {isOpen && (
                <div className="p-4 pt-0 pl-13 border-t border-gray-100 dark:border-gray-700 mt-2">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Interviewer Intention</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{q.intention}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <p className="text-xs font-semibold text-green-700 dark:text-green-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <CheckCircle2 size={14} /> Suggested Answer Strategy
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
