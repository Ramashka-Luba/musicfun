import { baseApi } from "@/app/baseApi.ts"
import type { TracksResponse } from "@/features/traks/api/tracksApi.type.ts"

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Cursor pagination
    _fetchTracks: build.infiniteQuery<TracksResponse, void, string | null>({
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
          return lastPage.meta.nextCursor || null
        },
      },
      query: ({ pageParam }) => ({
        url: "playlists/tracks",
        params: { cursor: pageParam, paginationType: "cursor", pageSize: 5 },
      }),
    }),

    // Offset pagination
    fetchTracks: build.infiniteQuery<TracksResponse, void, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          return lastPageParam < (lastPage.meta as { pagesCount: number }).pagesCount ? lastPageParam + 1 : undefined
        },
      },
      query: ({ pageParam }) => ({
        url: "playlists/tracks",
        params: { pageNumber: pageParam, pageSize: 10, paginationType: "offset" },
      }),
    }),
  }),
})

export const { useFetchTracksInfiniteQuery } = tracksApi
