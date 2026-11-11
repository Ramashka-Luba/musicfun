// Type predicate to narrow an unknown error to an object with a string 'message' property

export const isErrorWithDetailArray = (data: unknown): data is { errors: Array<{ detail: string }> } => {
  return (
    typeof data === "object" &&
    data !== null &&
    "errors" in data &&
    Array.isArray((data as any).errors) &&
    (data as any).errors.length > 0 &&
    typeof (data as any).errors[0].detail === "string"
  )
}
