export interface Question {
  question: string;
  intention: string;
  answer: string;
}

export interface SkillGap {
  skill: string;
  severity: "high" | "medium" | "low";
}

export interface PreparationTask {
  day: number;
  focus: string;
  tasks: string[];
}

export interface InterviewReport {
  id?: string;
  createdAt?: string;
  name: string;
  matchScore: number;
  technicalQuestions: Question[];
  behavioralQuestions: Question[];
  skillsGaps: SkillGap[];
  preparationPlan: PreparationTask[];
  title: string;
}
