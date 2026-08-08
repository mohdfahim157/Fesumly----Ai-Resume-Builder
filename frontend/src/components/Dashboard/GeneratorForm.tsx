import React, { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

export default function GeneratorForm({ mode }: { mode: 'interview' | 'resume' }) {
  const { handleGenerateReport, handleGenerateResume } = useAuth();
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resumeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload a resume (PDF) first.");
      return;
    }
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    
    try {
      setIsLoading(true);
      
      if (mode === 'interview') {
        const response = await handleGenerateReport(formData);
        const reportData = response?.report || response;
        if (reportData && (reportData.name !== undefined || reportData.matchScore !== undefined || reportData.technicalQuestions)) {
          reportData.id = crypto.randomUUID();
          reportData.createdAt = new Date().toISOString();
          const existingStr = localStorage.getItem("interviewReports");
          let reports = [];
          if (existingStr) {
             try { reports = JSON.parse(existingStr); } catch(e) {}
          }
          reports.push(reportData);
          localStorage.setItem("interviewReports", JSON.stringify(reports));
          navigate(`/interview/${reportData.id}`);
        } else {
          console.error("Unrecognized response format:", response);
        }
      } else if (mode === 'resume') {
        const response = await handleGenerateResume(formData);
        
        let htmlContent = null;
        if (typeof response?.report === 'string') {
            htmlContent = response.report;
        } else if (typeof response?.report?.html === 'string') {
            htmlContent = response.report.html;
        } else if (typeof response?.html === 'string') {
            htmlContent = response.html;
        } else if (typeof response === 'string') {
            htmlContent = response;
        }

        if (htmlContent) {
          localStorage.setItem("latestResumeHtml", htmlContent);
          navigate(`/resume/result`);
        } else {
          console.error("Unrecognized resume response format:", response);
        }
      }
      
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === "jobDescription") {
      setJobDescription(e.target.value);
    } else if (e.target.name === "selfDescription") {
      setSelfDescription(e.target.value);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please drop a PDF file.");
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold m-2 text-gray-900 dark:text-gray-100 text-center">
        Create Your Custom{" "}
        <span className="text-green-500">
          {mode === 'interview' ? 'Interview Plan' : 'Resume'}
        </span>
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 px-4 text-center">
        Let our AI analyze the job requirements and your unique profile to{" "}
        <br className="hidden md:block" />
        {mode === 'interview' ? 'build a winning strategy.' : 'tailor a standout resume.'}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 min-h-0 rounded-2xl w-full max-w-5xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 shadow-sm"
      >
        <div className="flex flex-col md:flex-row flex-1 min-h-0 w-full justify-around gap-4 md:gap-8">
          <div className="flex flex-col w-full md:w-1/2 justify-start h-full">
            <label htmlFor="jobDescription" className="text-base md:text-lg font-bold mt-1 text-gray-900 dark:text-gray-100 text-left">
              Target Job Description
            </label>
            <textarea
              className="flex-1 mt-2 w-full p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-transparent focus:border-green-500 resize-none outline-none rounded-lg transition-colors"
              name="jobDescription"
              id="jobDescription"
              onChange={handleChange}
              value={jobDescription}
              maxLength={5000}
              placeholder={`Paste the full job description here...`}
            ></textarea>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-start md:border-l-2 md:border-gray-200 dark:md:border-gray-700 md:pl-6 gap-3 h-full">
            <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 self-start md:self-center">Your Profile</h2>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => resumeRef.current?.click()}
              className={`relative border rounded-xl py-3 px-3 text-sm w-full md:w-4/5 flex flex-col items-center gap-2 cursor-pointer transition-colors duration-200 ${
                isDragging
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-green-400/60 bg-white dark:bg-gray-700 hover:border-green-500"
              }`}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.665 3.667H11a3.667 3.667 0 0 0-3.667 3.666v29.334A3.667 3.667 0 0 0 11 40.333h22a3.667 3.667 0 0 0 3.666-3.666v-22m-11-11 11 11m-11-11v11h11m-7.333 9.166H14.665m14.667 7.334H14.665M18.332 16.5h-3.667"
                  stroke="currentColor"
                  className="text-green-500"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-green-600 dark:text-green-400 font-medium text-center break-all">
                    {selectedFile.name}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      if (resumeRef.current) resumeRef.current.value = "";
                    }}
                    className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 px-3 py-1 rounded-md transition-colors"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-300">Drag & drop your PDF here</p>
                  <p className="text-gray-400 dark:text-gray-400 text-xs mt-1">
                    Or <span className="text-green-500 underline">click</span> to upload
                  </p>
                </div>
              )}
              <input
                ref={resumeRef}
                id="fileInput"
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="w-full md:w-4/5 flex flex-col flex-1 min-h-0">
              <label htmlFor="selfDescription" className="block text-left font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Quick Self Description
              </label>
              <textarea
                className="flex-1 w-full rounded-lg p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-transparent focus:border-green-500 resize-none outline-none transition-colors"
                name="selfDescription"
                id="selfDescription"
                onChange={handleChange}
                value={selfDescription}
                maxLength={5000}
                placeholder="Briefly describe your experience and key skills..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-4 mx-auto rounded-lg w-full flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 gap-2 border border-gray-100 dark:border-gray-700 shrink-0">
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
            {mode === 'interview' ? 'AI-Powered Strategy Generation' : 'AI-Powered Resume Generation'} · Approx 30s
          </p>
          <button
            type="submit"
            disabled={!selectedFile || isLoading}
            className="w-auto bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-5 sm:px-8 py-2 sm:py-3 rounded-xl font-medium cursor-pointer hover:bg-green-600 transition flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
