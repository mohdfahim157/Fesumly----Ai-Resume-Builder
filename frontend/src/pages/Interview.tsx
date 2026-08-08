import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import type { InterviewReport } from '../types/interview';
import MatchScore from '../components/Interview/MatchScore';
import QuestionList from '../components/Interview/QuestionList';
import SkillsGap from '../components/Interview/SkillsGap';
import PreparationPlan from '../components/Interview/PreparationPlan';
import { ArrowLeft, Download } from 'lucide-react';
import Logout from '../components/Logout/Logout';

export default function Interview() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find report in localStorage by ID
  let report: InterviewReport | null = null;
  
  const existingStr = localStorage.getItem("interviewReports");
  if (existingStr) {
    try {
      const reports = JSON.parse(existingStr);
      report = reports.find((r: InterviewReport) => r.id === id) || null;
    } catch(e) {
      console.error("Failed to parse saved reports", e);
    }
  }

  // Redirect if no report data is found anywhere
  useEffect(() => {
    if (!report) {
      navigate('/reports', { replace: true });
    }
  }, [report, navigate]);

  if (!report) return <h1>No Data</h1>;

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-20 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/reports" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors print:hidden">
            <ArrowLeft className="text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 hidden sm:block">
            Your Interview Strategy
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => window.print()} className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors print:hidden">
            <Download size={16} /> Export PDF
          </button>
          <div className="print:hidden">
            <Logout />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Sticky Sidebar on Desktop) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-2xl font-bold mb-4">
              {report.name ? report.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{report.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{report.title}</p>
          </div>

          <MatchScore score={report.matchScore} title={report.title} />
          
          <SkillsGap skills={report.skillsGaps} />

        </div>

        {/* Right Column (Scrollable Content) */}
        <div className="lg:col-span-8 space-y-6">
          <QuestionList title="Technical Questions" questions={report.technicalQuestions} />
          <QuestionList title="Behavioral Questions" questions={report.behavioralQuestions} />
          <PreparationPlan plan={report.preparationPlan} />
        </div>
        
      </main>
    </div>
  );
}
