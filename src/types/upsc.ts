export type Language = 'en' | 'hi';

export type ContrastMode = 'normal' | 'high' | 'night';

export interface ExamNotification {
  id: string;
  titleEn: string;
  titleHi: string;
  examCode: string;
  date: string;
  isNew?: boolean;
  category: 'examination' | 'result' | 'recruitment' | 'press_release';
  fileSize?: string;
  pdfUrl?: string;
  applyLink?: boolean;
}

export interface ExamCalendarItem {
  id: string;
  examNameEn: string;
  examNameHi: string;
  notificationDate: string;
  lastDateToApply: string;
  examDate: string;
  durationDays: number;
}

export interface CandidateResult {
  rollNo: string;
  candidateName: string;
  rank: number;
  category: 'General' | 'EWS' | 'OBC' | 'SC' | 'ST' | 'PwBD-1' | 'PwBD-2';
  mainsMarks: number;
  interviewMarks: number;
  totalMarks: number;
  serviceAllotted: 'IAS' | 'IPS' | 'IFS' | 'IRS (IT)' | 'IRS (C&IT)' | 'IA&AS';
}

export interface CutoffData {
  year: number;
  exam: string;
  prelims: {
    general: number;
    ews: number;
    obc: number;
    sc: number;
    st: number;
    pwbd1: number;
  };
  mains: {
    general: number;
    ews: number;
    obc: number;
    sc: number;
    st: number;
    pwbd1: number;
  };
  final: {
    general: number;
    ews: number;
    obc: number;
    sc: number;
    st: number;
    pwbd1: number;
  };
}

export interface MockQuestion {
  id: number;
  subject: string;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctOptionIndex: number;
  explanationEn: string;
  explanationHi: string;
}

export interface PreviousPaper {
  id: string;
  year: number;
  examName: string;
  paperName: string;
  subject: string;
  maxMarks: number;
  duration: string;
  sampleQuestions: {
    qNo: number;
    text: string;
    marks: number;
  }[];
}
