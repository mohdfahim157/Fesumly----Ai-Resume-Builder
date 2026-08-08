import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { InterviewReport } from "../types/interview";
import { Trash2, ArrowLeft, Briefcase, Calendar, ChevronRight } from "lucide-react";

export default function Reports() {
  const [reports, setReports] = useState<InterviewReport[]>([]);

  useEffect(() => {
    const existingStr = localStorage.getItem("interviewReports");
    if (existingStr) {
      try {
        const parsed = JSON.parse(existingStr);
        // Sort descending by date
        parsed.sort((a: InterviewReport, b: InterviewReport) => {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });
        setReports(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this strategy?")) {
      const updated = reports.filter(r => r.id !== id);
      setReports(updated);
      localStorage.setItem("interviewReports", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-20 shadow-sm flex items-center">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors mr-2">
          <ArrowLeft className="text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Strategies</h1>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {reports.length === 0 ? (
          <div className="text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-10 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No strategies found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't generated any interview strategies yet.</p>
            <Link to="/dashboard" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-medium transition-colors">
              Generate One Now
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md">
                
                <div className="flex-1 min-w-0 flex items-start sm:items-center gap-4">
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold shrink-0">
                    {report.matchScore}%
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                      {report.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} /> {report.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> 
                        {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Unknown date'}
                      </span>
                      <span className="sm:hidden font-medium text-green-600 dark:text-green-400">
                        Match: {report.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => handleDelete(report.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-1 sm:flex-none flex justify-center"
                    title="Delete strategy"
                  >
                    <Trash2 size={18} />
                  </button>
                  <Link 
                    to={`/interview/${report.id}`} 
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    View <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
