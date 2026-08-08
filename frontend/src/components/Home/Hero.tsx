import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col items-center bg-linear-to-b from-[#acf2aa] to-[#F8F3F9] dark:from-gray-900 dark:to-gray-800 px-4 pt-4 transition-colors duration-300">
        <nav className="flex items-center justify-between gap-8 bg-white/60 dark:bg-gray-800/80 border border-white dark:border-gray-700 rounded-full px-4 md:px-2 py-2.5 w-full max-w-3xl">
          <Link
           to={"/"}
            className="flex items-center md:pl-3"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8"
                y="8"
                width="112"
                height="112"
                rx="28"
                fill="#16A34A"
              />

              <rect x="34" y="22" width="60" height="84" rx="10" fill="white" />

              <circle cx="64" cy="42" r="12" fill="#DCFCE7" />

              <circle cx="64" cy="40" r="7" fill="#16A34A" />
              <path
                d="M50 62C50 54.82 55.82 49 63 49H65C72.18 49 78 54.82 78 62V64H50V62Z"
                fill="#16A34A"
              />

              <rect
                x="48"
                y="74"
                width="34"
                height="5"
                rx="2.5"
                fill="#86EFAC"
              />
              <rect
                x="48"
                y="84"
                width="26"
                height="5"
                rx="2.5"
                fill="#86EFAC"
              />
              <rect
                x="48"
                y="94"
                width="20"
                height="5"
                rx="2.5"
                fill="#86EFAC"
              />

              <path
                d="M96 26L98.5 33.5L106 36L98.5 38.5L96 46L93.5 38.5L86 36L93.5 33.5L96 26Z"
                fill="#FACC15"
              />

              <circle cx="28" cy="94" r="6" fill="#BBF7D0" />
            </svg>
          </Link>
          <div className="w-0.5 h-8 bg-gray-50 dark:bg-gray-700 hidden md:flex"></div>
          <div
            id="menu"
            className={`max-md:absolute max-md:bg-white/90 max-md:dark:bg-gray-800/90 max-md:h-196 max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:backdrop-blur flex items-center gap-8 z-50 md:gap-10 flex-1 ${mobileOpen ? "max-md:w-full" : "max-md:w-0"}`}
          >
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white py-2 px-3 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full text-sm transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-sm py-2 px-3 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonial"
              onClick={() => setMobileOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-sm py-2 px-3 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              Testimonials
            </a>
        
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-sm py-2 px-3 hover:bg-green-50 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              Contact Us
            </a>

            <button
              id="close-menu"
              onClick={() => setMobileOpen(false)}
              className="md:hidden bg-green-500 hover:bg-green-600 text-white p-2 rounded-md aspect-square font-medium transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2 md:pr-1">
            <Link to={"/login"} className="hidden md:inline-block bg-green-600 hover:bg-green-700  text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm transition cursor-pointer">
              LogIn
            </Link>

            <button
              id="open-menu"
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-gray-700 dark:text-gray-200 p-2 rounded-md aspect-square font-medium transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="flex flex-wrap items-center justify-center gap-2 pl-2 pr-4 py-1.5 mt-10 rounded-full bg-white/50 dark:bg-gray-800/50 border border-white dark:border-gray-700">
          <div className="relative flex size-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
            <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
          </div>
          <p className="text-sm text-black/60 dark:text-white/80">
            Join 450+ brands growing with us
          </p>
        </div>

        <h1 className="text-4xl md:text-[66px]/19 text-center max-w-4xl mt-5 text-gray-800 dark:text-gray-100 bg-clip-text leading-tight font-medium">
          Land your dream job with <span className="text-green-800 dark:text-green-400">Ai powered</span> resumes.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-110 mt-4">
         Create, Edit and Download Professional resumes with AI-powered assistance
        </p>

        <div className="flex gap-3 mt-10">
          <Button/>
        </div>

        <div className="w-full max-w-200 h-0.75 mt-10 bg-linear-to-r from-white/10 via-green-600 to-white/10"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 max-w-232.5 w-full">
          <div className="text-center">
            <h2 className="font-medium text-2xl md:text-3xl text-gray-800 dark:text-gray-100">
              20+
            </h2>
            <p className="text-xs md:text-sm text-gray-500">Years Experience</p>
          </div>
          <div className="text-center">
            <h2 className="font-medium text-2xl md:text-3xl text-gray-800 dark:text-gray-100">
              12k+
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              Projects Completed
            </p>
          </div>
          <div className="text-center">
            <h2 className="font-medium text-2xl md:text-3xl text-gray-800 dark:text-gray-100">
              5k+
            </h2>
            <p className="text-xs md:text-sm text-gray-500">Happy Customers</p>
          </div>
          <div className="text-center">
            <h2 className="font-medium text-2xl md:text-3xl text-gray-800 dark:text-gray-100">
              5+
            </h2>
            <p className="text-xs md:text-sm text-gray-500">Countries</p>
          </div>
        </div>
      </section>
    </>
  );
}
