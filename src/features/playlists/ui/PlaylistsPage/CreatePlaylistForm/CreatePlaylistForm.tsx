import { type SubmitHandler, useForm } from "react-hook-form"
import type { CreatePlaylistArgs } from "@/features/playlists/api/playlistApi.type.ts"
import { useCreatePlaylistsMutation } from "@/features/playlists/api/playlistApi.ts"

export const CreatePlaylistForm = () => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>()

  const [createPlaylists] = useCreatePlaylistsMutation()

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = (data) => {
    createPlaylists({ data: { ...data.data, type: "playlists" } })
      .unwrap()
      .then(() => {
        reset()
      })
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register("data.attributes.title")} placeholder={"title"} />
      </div>
      {/*//ToDo fix description*/}
      <div>
        <input {...register("data.attributes.description")} placeholder={"description"} />
      </div>
      <button>create playlist</button>
    </form>
  )
}
