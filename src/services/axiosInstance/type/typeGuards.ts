import { ApiError } from "./index";

export function isApiError(error: unknown): error is ApiError {
  return (
    error !== null &&
    typeof error === "object" &&
    "errorMessage" in error &&
    "status" in error
  );
}
