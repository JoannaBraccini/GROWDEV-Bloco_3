import { Assessment } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

interface AssessmentMockParams {
  id?: string;
  title?: string;
  description?: string;
  grade?: number;
  studentId?: string;
  createdBy?: string;
}

export class AssessmentMock {
  public static build(params?: AssessmentMockParams): Assessment {
    return {
      id: params?.id || randomUUID(),
      title: params?.title || "any_title",
      description: params?.description || "any_desc",
      grade: new Decimal(params?.grade || 10),
      studentId: params?.studentId || randomUUID(),
      createdBy: params?.createdBy || "any_id",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
