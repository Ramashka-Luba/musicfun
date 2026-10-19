import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from "react-hook-form"
import type { UpdatePlaylistArgs } from "@/features/playlists/api/playlistApi.type.ts"
import { useUpdatePlaylistMutation } from "@/features/playlists/api/playlistApi.ts"

type Props = {
  playlistId: string
  setPlaylistId: (playlistId: null) => void
  editPlaylist: (playlist: null) => void
  register: UseFormRegister<UpdatePlaylistArgs>
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
}

export const EditPlaylistForm = ({ playlistId, setPlaylistId, handleSubmit, editPlaylist, register }: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
    console.log(data)
    if (!playlistId) return
    updatePlaylist({
      playlistId,
      body: {
        data: {
          ...data.data,
          type: "playlists",
        },
      },
    }).then(() => {
      setPlaylistId(null)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register("data.attributes.title")} placeholder={"title"} />
      </div>
      <div>
        <input {...register("data.attributes.description")} placeholder={"description"} />
      </div>
      <button type={"submit"}>save</button>
      <button type={"button"} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  )
}
