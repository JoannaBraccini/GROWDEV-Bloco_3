export interface Assessment {
  id: string;
  title: string;
  description: string;
  grade: number;
  studentId: string;
  createdBy: string;
  createdAt: string;
}

export type CreateAssessmentRequest = Pick<
  Assessment,
  "title" | "description" | "grade" | "studentId" | "createdBy"
>;

export type UpdateAssessmentRequest = Partial<
  Omit<CreateAssessmentRequest, "studentId" | "createdBy">
> & {
  id: string;
};

export type DeleteAssessmentRequest = {
  id: string;
};

export type QueryAssessmentRequest = {
  page?: number;
  take?: number;
};
