import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Playlist"],
  baseQuery: async (args, api, extraOptions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)) //  тестируем, разрабатываем курктилочки

    return fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        "API-KEY": import.meta.env.VITE_API_KEY,
      },
      prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
        return headers
      },
    })(args, api, extraOptions)
  },
  // keepUnusedDataFor: 40, // кэш глобально умирает через 40 сек
  // refetchOnFocus: true, // обновляет глобально данные, когда вернул фокус на страницу, но уходят обсолютно все запросы
  // refetchOnReconnect: true, // обновляет глобально данные, после того как не было соединение с сетью
  endpoints: () => ({}),
})
