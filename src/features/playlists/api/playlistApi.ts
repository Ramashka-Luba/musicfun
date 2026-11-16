import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistApi.type.ts"
import { baseApi } from "@/app/baseApi.ts"
import type { Images } from "@/common/types"

export const playlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: (params) => ({
        url: "playlists",
        params,
      }),
      providesTags: ["Playlist"],
      // keepUnusedDataFor: 30, // кэш для плэйлиста умирает через 30 сек
    }),

    createPlaylists: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: (body) => ({
        method: "post",
        url: "playlists",
        body,
      }),
      invalidatesTags: ["Playlist"],
    }),

    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({
        method: "delete",
        url: `playlists/${playlistId}`,
      }),
      invalidatesTags: ["Playlist"],
    }),

    updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
      query: ({ playlistId, body }) => {
        return {
          method: "put",
          url: `playlists/${playlistId}`,
          body,
        }
      },
      onQueryStarted: async ({ playlistId, body }, { queryFulfilled, dispatch, getState }) => {
        const args = playlistApi.util.selectCachedArgsForQuery(getState(), "fetchPlaylists")

        const patchCollections: any[] = []

        args.forEach((arg) => {
          patchCollections.push(
            dispatch(
              playlistApi.util.updateQueryData(
                "fetchPlaylists",
                {
                  pageNumber: arg.pageNumber,
                  pageSize: arg.pageSize,
                  search: arg.search,
                },
                (state) => {
                  const index = state.data.findIndex((playlist) => playlist.id === playlistId)
                  if (index !== -1) {
                    state.data[index].attributes = { ...state.data[index].attributes, ...body.data.attributes }
                  }
                },
              ),
            ),
          )
        })

        try {
          await queryFulfilled
        } catch (e) {
          patchCollections.forEach((patchCollection) => {
            patchCollection.undo()
          })
        }
      },
      invalidatesTags: ["Playlist"],
    }),

    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      query: ({ playlistId, file }) => {
        const formData = new FormData()
        formData.append("file", file)
        return {
          method: "post",
          url: `playlists/${playlistId}/images/main`,
          body: formData,
        }
      },
      invalidatesTags: ["Playlist"],
    }),

    deletePlaylistCover: build.mutation<void, string>({
      query: (playlistId) => ({
        url: `playlists/${playlistId}/images/main`,
        method: "delete",
      }),
      invalidatesTags: ["Playlist"],
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistsMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistApi
