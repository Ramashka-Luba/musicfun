import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Playlist"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    },
  }),
  // keepUnusedDataFor: 40, // кэш глобально умирает через 40 сек
  // refetchOnFocus: true, // обновляет глобально данные, когда вернул фокус на страницу, но уходят обсолютно все запросы
  // refetchOnReconnect: true, // обновляет глобально данные, после того как не было соединение с сетью
  endpoints: () => ({}),
})
