import defaultCover from "@/assets/images/default-playlist-cover.png"
import type { ChangeEvent } from "react"
import { useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation } from "@/features/playlists/api/playlistApi.ts"
import s from "./PlaylistCover.module.css"
import type { Images } from "@/common/types"
import { toast } from "react-toastify"

type Props = {
  playlistId: string
  images: Images
}

export const PlaylistCover = ({ playlistId, images }: Props) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
  const [deleteCover] = useDeletePlaylistCoverMutation()

  const uploadPlaylistCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024 // 1MB
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]

    const file = event.target.files?.length && event.target.files[0]
    if (!file) return

    if (!allowedTypes.includes(file.type)) {
      toast("Only JPEG, PNG or GIF images are allowed", { type: "error", theme: "colored" })
      return
    }

    if (file.size > maxSize) {
      toast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`, { type: "error", theme: "colored" })
      return
    }

    uploadPlaylistCover({ playlistId, file: file })
  }

  const deleteCoverHandler = () => {
    deleteCover(playlistId)
  }

  const originCover = images.main.find((img) => img.type === "original")
  const src = originCover ? originCover.url : defaultCover

  return (
    <>
      <img className={s.cover} width={"240px"} src={src} alt="images" />
      <input type="file" accept={"image/jpeg, image/png, image/gif"} onChange={uploadPlaylistCoverHandler} />
      {originCover && <button onClick={deleteCoverHandler}>delete cover</button>}
    </>
  )
}
