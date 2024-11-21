export interface ApiError {
  errorMessage: string;
  status: number;
  needEmail?: boolean
  respData?: {
    needVerification?: boolean;
  };
}
