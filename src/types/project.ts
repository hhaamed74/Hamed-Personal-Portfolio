export type Project = {
  id: string;
  title: string;
  summary: string;
  description?: string; // تفاصيل أكتر عن المشروع (لصفحة المشروع المنفصلة)
  cover: string;
  tech: string[];

  // الروابط
  liveUrl?: string;
  repoUrl?: string;

  // الإحصائيات (تُدار محلياً أو من API)
  views: number; // خليها أساسية واجبارية بقيمة افتراضية 0
  likes?: number;

  // التصنيفات
  category?: "frontend" | "backend" | "fullstack" | "ui/ux";
  featured?: boolean; // عشان تظهر مشاريع معينة في الـ Home

  // التواريخ
  createdAt: string; // ISO Date "2024-08-12T..."
  updatedAt?: string;
};

// نوع مساعد للتحكم في عرض البطاقات (Cards)
export type ProjectPreview = Pick<
  Project,
  "id" | "title" | "summary" | "cover" | "tech" | "views"
>;
