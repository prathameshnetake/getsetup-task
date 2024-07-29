declare namespace Express {
  export interface Request {
    uid?: string;
    authToken?: string;
  }
}
