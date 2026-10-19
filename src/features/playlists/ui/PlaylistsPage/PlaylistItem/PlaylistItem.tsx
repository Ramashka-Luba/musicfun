import type { PlaylistData } from "@/features/playlists/api/playlistApi.type.ts"

type Props = {
  playlist: PlaylistData
  deletePlaylistHandler: (playlistId: string) => void
  editPlaylistHandler: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, deletePlaylistHandler, editPlaylistHandler }: Props) => {
  return (
    <div>
      <div>{playlist.attributes.title}</div>
      <div>description:{playlist.attributes.description}</div>
      <div>{playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
      <button onClick={() => editPlaylistHandler(playlist)}>update</button>
    </div>
  )
}
