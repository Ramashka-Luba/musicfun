import { toast } from "react-toastify"
import { isErrorWithError } from "@/common/utils/isErrorWithError.ts"
import { isErrorWithDetailArray } from "@/common/utils/isErrorWithDetailArray.ts"
import { trimToMaxLength } from "@/common/utils/trimToMaxLength.ts"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { errorToast } from "@/common/utils/errorToast.ts"

export const handleErrors = (error: FetchBaseQueryError) => {
  if (error) {
    switch (error.status) {
      case "FETCH_ERROR": // если offline и создаем плейлист
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
      case "TIMEOUT_ERROR":
        toast(error.error)
        break

      case 404: // сломан endpoint
        // toast((result.error.data as { error: string }).error, { type: "error", theme: "colored" })
        if (isErrorWithError(error.data)) {
          errorToast(error.data.error)
        } else {
          errorToast(JSON.stringify(error.data))
        }
        break

      case 400: // Длинный title
        if (isErrorWithDetailArray(error.data)) {
          errorToast(trimToMaxLength(error.data.errors[0].detail))
        } else {
          errorToast(JSON.stringify(error.data))
        }
        break

      case 401: // Unauthorized
      case 403: // Например махимум 10 плэйлистов / удалить чужой плейлист
      case 429: // Сломан api-key
        // ✅ 1. Type Assertions
        // toast((result.error.data as { errors: Array<{ detail: string }> }).errors[0].detail, {type: "error", theme: "colored"})

        // ✅ 2. JSON.stringify
        // toast(JSON.stringify(result.error.data), { type: "error", theme: "colored" })

        // ✅ 3. Type Predicate
        if (isErrorWithDetailArray(error.data)) {
          errorToast(error.data.errors[0].detail)
        } else {
          errorToast(JSON.stringify(error.data))
        }
        break

      default:
        if (error.status >= 500 && error.status < 600) {
          errorToast("Server error occurred. Please try again later.")
        } else {
          errorToast("Some error occurred")
        }
    }
  }
}
