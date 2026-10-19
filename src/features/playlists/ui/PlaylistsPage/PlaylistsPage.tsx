import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from "@/features/playlists/api/playlistApi.ts"
import s from "./PlaylistPage.module.css"
import { CreatePlaylistForm } from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx"
import { useForm } from "react-hook-form"
import type { PlaylistData, UpdatePlaylistArgs } from "@/features/playlists/api/playlistApi.type.ts"
import { useState } from "react"
import { PlaylistItem } from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem.tsx"
import { EditPlaylistForm } from "@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm.tsx"

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

  const { data } = useFetchPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    deletePlaylist(playlistId)
  }

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        data: {
          attributes: {
            title: playlist.attributes.title,
            description: playlist.attributes.description,
            tagIds: playlist.attributes.tags.map((t) => t.id),
          },
        },
      })
    } else {
      setPlaylistId(null)
    }
  }

  return (
    <div className={s.container}>
      <h1>Playlists Page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist) => {
          const isEditing = playlist.id === playlistId

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <EditPlaylistForm
                  playlistId={playlistId}
                  setPlaylistId={setPlaylistId}
                  editPlaylist={editPlaylistHandler}
                  register={register}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylistHandler={deletePlaylistHandler}
                  editPlaylistHandler={editPlaylistHandler}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
