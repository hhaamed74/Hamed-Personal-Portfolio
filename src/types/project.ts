// types/project.ts
export type Project = {
  id: string;
  title: string;
  summary: string;
  cover: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;

  /** اختياري: تاريخ النشر (ISO) للفرز بالأحدث/الأقدم */
  createdAt?: string; // مثال: "2024-08-12"

  /** اختياري: قيمة seed للمشاهدات (تُدمَج مع localStorage) */
  views?: number;
};
