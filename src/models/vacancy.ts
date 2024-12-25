export interface Vacancy {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    company: string;
    title: string;
    description: string | null;
    startDate: string | null;
    endDate: string | null;
  }
  