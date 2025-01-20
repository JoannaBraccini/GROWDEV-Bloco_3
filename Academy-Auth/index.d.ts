declare namespace Express {
  export interface Request {
    authStudent: {
      id: string;
      name: string;
      email: string;
      studentType: "T" | "M" | "F";
    };
  }
}
