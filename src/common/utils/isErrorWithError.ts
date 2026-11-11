// Type predicate to narrow an unknown error to an object with a string 'message' property

export const isErrorWithError = (data: unknown): data is { error: string } => {
  return typeof data === "object" && data !== null && "error" in data && typeof (data as any).error === "string"
}
