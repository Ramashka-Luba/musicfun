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
      query: ({ playlistId, body }) => ({
        method: "put",
        url: `playlists/${playlistId}`,
        body,
      }),
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
