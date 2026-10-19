import { Route, Routes } from "react-router"
import { MainPage } from "@/app/ui/MainjPage/MainPage.tsx"
import { ProfilePage } from "@/features/auth/ui/ProfolePage/ProfilePage.tsx"
import { PlaylistsPage } from "@/features/playlists/ui/PlaylistsPage/PlaylistsPage.tsx"
import { TracksPage } from "@/features/traks/ui/TracksPage/TracksPage.tsx"
import { PageNotFound } from "@/common/components"

export const PATH = {
  MAIN: "/",
  PROFILE: "/profile",
  PLAYLISTS: "/playlists",
  TRACK: "/tracks",
  NOTFOUND: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.MAIN} element={<MainPage />} />
      <Route path={PATH.PROFILE} element={<ProfilePage />} />
      <Route path={PATH.PLAYLISTS} element={<PlaylistsPage />} />
      <Route path={PATH.TRACK} element={<TracksPage />} />
      <Route path={PATH.NOTFOUND} element={<PageNotFound />} />
    </Routes>
  )
}
