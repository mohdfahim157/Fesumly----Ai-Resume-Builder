import { Navigate } from "react-router-dom";
import { useBuilder } from "../../../context/Builder.context";

export default function Protected({ children }: { children: React.ReactNode }) {
    const { user, isInitializing } = useBuilder();

    // If we are checking the session on initial load AND we have no cached user, show a spinner.
    // If we DO have a cached user, we skip the spinner and render children immediately for instant access,
    // while the backend checks the token in the background.
    if (isInitializing && !user) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
                <svg className="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    const isUnauthorized = user === undefined || user === null;

    if (isUnauthorized) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}