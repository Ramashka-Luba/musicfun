import type { PlaylistAttributes } from "@/features/playlists/api/playlistApi.type.ts"

type Props = {
  attributes: PlaylistAttributes
}

export const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <>
      <div>{attributes.title}</div>
      <div>{attributes.user.name}</div>
      <div>{attributes.description}</div>
    </>
  )
}
