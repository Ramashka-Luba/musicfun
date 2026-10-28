import { baseApi } from "@/app/baseApi.ts"
import type { MeResponse } from "@/features/auth/api/authApi.type.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => "auth/me",
    }),
  }),
})

export const { useGetMeQuery } = authApi
