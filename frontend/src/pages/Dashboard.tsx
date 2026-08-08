import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, FileBadge, LayoutDashboard } from "lucide-react";
import GeneratorForm from "../components/Dashboard/GeneratorForm";
import Logout from "../components/Logout/Logout";

export default function Dashboard() {
  const [hasReport, setHasReport] = useState(false);
  const [latestReportId, setLatestReportId] = useState<string | null>(null);
  const [hasResume, setHasResume] = useState(false);
  const [mode, setMode] = useState<"interview" | "resume">("resume");

  useEffect(() => {
    // Migrate old single report to the array if it exists
    const oldReportStr = localStorage.getItem("latestInterviewReport");
    if (oldReportStr) {
      try {
        const oldReport = JSON.parse(oldReportStr);
        let reports = [];
        const existingStr = localStorage.getItem("interviewReports");
        if (existingStr) reports = JSON.parse(existingStr);

        // Give it an id and push it
        if (
          !reports.find(
            (r: any) =>
              r.name === oldReport.name &&
              r.matchScore === oldReport.matchScore,
          )
        ) {
          oldReport.id = crypto.randomUUID();
          oldReport.createdAt = new Date().toISOString();
          reports.push(oldReport);
          localStorage.setItem("interviewReports", JSON.stringify(reports));
        }
        localStorage.removeItem("latestInterviewReport"); // clean up
      } catch (e) {}
    }

    // Check for strategies
    const existingStr = localStorage.getItem("interviewReports");
    if (existingStr) {
      try {
        const parsed = JSON.parse(existingStr);
        if (parsed && parsed.length > 0) {
          setHasReport(true);
          // Find the latest one by createdAt
          parsed.sort(
            (a: any, b: any) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime(),
          );
          setLatestReportId(parsed[0].id);
        }
      } catch (e) {}
    }

    // Check for resumes
    if (localStorage.getItem("latestResumeHtml")) {
      setHasResume(true);
    }
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300 relative flex flex-col md:flex-row">
      {/* Left Sidebar Toggle */}
      <aside className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2 shrink-0 z-10 md:pt-20">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 hidden md:block">
          Generator Tools
        </h2>

        <button
          onClick={() => setMode("resume")}
          className={`flex items-center gap-3 cursor-pointer w-full p-3 rounded-xl transition-all ${mode === "resume" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shadow-sm" : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"}`}
        >
          <FileBadge size={20} />
          <span className="font-medium text-sm md:text-base">
            Resume Builder
          </span>
        </button>

        <button
          onClick={() => setMode("interview")}
          className={`flex items-center gap-3 cursor-pointer w-full p-3 rounded-xl transition-all ${mode === "interview" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shadow-sm" : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"}`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium text-sm md:text-base">
            Interview Strategy
          </span>
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="w-full p-4 flex justify-end items-center gap-4 shrink-0 z-10">
          {latestReportId && (
            <Link
              to={`/interview/${latestReportId}`}
              className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
            >
              <FileText size={16} /> Last Plan
            </Link>
          )}
          {hasResume && (
            <Link
              to="/resume/result"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              <FileBadge size={16} /> Last Resume
            </Link>
          )}
          {hasReport && (
            <Link
              to="/reports"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              All Strategies
            </Link>
          )}
          <Logout />
        </header>
        <main className="flex-1 w-full flex flex-col justify-center items-center px-4 md:px-8 pb-4 overflow-hidden">
          <GeneratorForm mode={mode} />
        </main>
      </div>
    </div>
  );
}
