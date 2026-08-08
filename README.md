# 🚀 Fesumly - AI-Powered Resume & Interview Prep Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google_Gemini-AI-orange?style=for-the-badge&logo=google" alt="Gemini AI" />
</div>

<br />

Fesumly is a comprehensive, full-stack application designed to help job seekers land their dream jobs. It leverages the power of Google's Gemini AI to analyze your resume, compare it against job descriptions, and provide actionable insights through AI-generated interview reports. Additionally, Fesumly features a built-in Resume Editor to help you craft the perfect ATS-friendly resume.

---

## ✨ Key Features

- **🧠 AI Interview Reports:** Upload your resume (PDF), provide a job description, and add a self-description to get a personalized, AI-generated interview preparation report.
- **📄 Smart Resume Editor:** Build and customize your resume with a real-time preview and intuitive editor interface.
- **🔐 Secure Authentication:** Full user authentication system with JWT, ensuring your data and reports are kept private.
- **🎨 Beautiful & Responsive UI:** Crafted with React 19 and Tailwind CSS v4, featuring smooth GSAP animations and a dark/light mode toggle.
- **📊 Dashboard & History:** Keep track of all your generated reports and previous interview preps in one place.
- **📄 PDF Parsing & Generation:** Seamlessly read data from uploaded PDFs and generate pixel-perfect PDFs using Puppeteer.

---

## 📸 Screenshots



| Home Light | Home Dark  |
| :---: | :---: |
 <img src="./frontend/public/Readme Photos/Home_Page_Light.png" alt="Home Page Light Mode" width="100%"> | <img src="./frontend/public/Readme Photos/Home_Page_Dark.png" alt="Resume Editor" width="100%">

| SignUp Light | SignUp Dark |
| :---: | :---: |
 <img src="./frontend/public/Readme Photos/SignUp Light.png" alt="Dashboard" width="100%"> | <img src="./frontend/public/Readme Photos/SignUp Dark.png" alt="Resume Editor" width="100%">

| Dashboard Light | Dashboard Dark |
| :---: | :---: |
 <img src="./frontend/public/Readme Photos/Dashboard Light.png" alt="Interview Report" width="100%"> | <img src="./frontend/public/Readme Photos/Dashboard Dark.png" alt="Login" width="100%"> 


| AI Resume Light | AI Resume Dark |
| :---: | :---: |
 <img src="./frontend/public/Readme Photos/Resume Light.png" alt="Interview Report" width="100%"> | <img src="./frontend/public/Readme Photos/Resume Dark.png" alt="Login" width="100%"> 

| AI Interview Light | AI Interview Dark |
| :---: | :---: |
 <img src="./frontend/public/Readme Photos/Interview Plan.png" alt="Interview Report" width="100%"> | <img src="./frontend/public/Readme Photos/Interview Plan Dark.png" alt="Login" width="100%"> 

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS v4** - Utility-first styling
- **React Router v7** - Routing
- **GSAP** - Animations
- **Lucide React** - Icons

### Backend
- **Node.js & Express** - Server framework
- **TypeScript** - Strongly typed JavaScript
- **MongoDB & Mongoose** - Database & ODM
- **Google GenAI SDK** - AI integration
- **Puppeteer** - PDF generation
- **Multer** - File handling
- **PDF-Parse** - Extracting text from uploaded resumes
- **JWT & Bcrypt** - Authentication & Security

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)
- Google Gemini API Key

### 1. Clone the repository

```bash
git clone https://github.com/mohdfahim157/fesumly.git
cd fesumly
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=3005
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
Fesumly/
├── backend/                # Node.js Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controller/     # Route controllers (auth, interview)
│   │   ├── middlewares/    # Custom middlewares (auth, multer file upload)
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic & AI integrations
│   │   └── types/          # TypeScript types
│   ├── server.ts           # Entry point
│   └── package.json
└── frontend/               # React Vite frontend
    ├── src/
    │   ├── assets/         # Static assets
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React context (Theme, Builder)
    │   ├── hooks/          # Custom React hooks
    │   ├── pages/          # Application pages
    │   ├── services/       # API call services
    │   └── types/          # TypeScript types
    ├── index.html
    └── package.json
```

---
