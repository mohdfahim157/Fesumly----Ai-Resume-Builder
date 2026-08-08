import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Download, Edit3, Save } from 'lucide-react';
import Logout from '../components/Logout/Logout';

export default function ResumeEditor() {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    // Get HTML from localStorage
    const savedHtml = localStorage.getItem('latestResumeHtml');
    if (!savedHtml) {
      navigate('/dashboard', { replace: true });
      return;
    }
    setHtmlContent(savedHtml);
  }, [navigate]);

  useEffect(() => {
    // Inject HTML into iframe and enable designMode
    if (htmlContent && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
        doc.designMode = "on"; // This makes the entire iframe editable
      }
    }
  }, [htmlContent]);

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Trigger print inside the iframe
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  const handleSave = () => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const updatedHtml = iframeRef.current.contentDocument.documentElement.outerHTML;
      localStorage.setItem('latestResumeHtml', updatedHtml);
      // Optional: show a success toast here if needed
      alert("Changes saved to browser storage.");
    }
  };

  if (!htmlContent) return null;

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Header toolbar */}
      <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shrink-0 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors print:hidden">
            <ArrowLeft className="text-gray-600 dark:text-gray-300" />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 hidden sm:block">
              Resume Editor
            </h1>
            <span className="hidden sm:flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">
              <Edit3 size={12} /> Click text to edit
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 print:hidden">
          <button 
            onClick={handleSave} 
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Save size={16} /> Save Changes
          </button>
          <button 
            onClick={handlePrint} 
            className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
          >
            <Download size={16} /> Export PDF
          </button>
          <Logout />
        </div>
      </header>

      {/* Editor Main Area */}
      <main className="flex-1 w-full bg-gray-200 dark:bg-gray-900 p-4 md:p-8 overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-4xl h-full bg-white shadow-xl flex flex-col rounded-sm overflow-hidden border border-gray-300 dark:border-gray-700">
          <iframe 
            ref={iframeRef}
            className="w-full h-full border-none bg-white"
            title="Resume Editor"
          />
        </div>
      </main>
      
    </div>
  );
}
