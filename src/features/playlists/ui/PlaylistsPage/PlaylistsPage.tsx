import { useFetchPlaylistsQuery } from "@/features/playlists/api/playlistApi.ts"
import s from "./PlaylistPage.module.css"
import { CreatePlaylistForm } from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx"
import { type ChangeEvent, useState } from "react"
import { useDebounceValue } from "@/common/hooks"
import { Pagination } from "@/common/components"
import { PlaylistList } from "@/features/playlists/ui/PlaylistsPage/PlaylistList/PlaylistList.tsx"

export const PlaylistsPage = () => {
  const [search, setSearch] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const debounceSearch = useDebounceValue(search ?? undefined)

  const { data, isLoading } = useFetchPlaylistsQuery(
    {
      search: debounceSearch,
      pageNumber: currentPage,
      pageSize: pageSize,
    },
    // {refetchOnFocus: true} // обновляй данные для плэйлиста, когда вернул  фокус на страницу
    // {refetchOnReconnect: true} // обновляет данные для плэйлиста, после того как не было соединение с сетью
    // {pollingInterval: 3000, skipPollingIfUnfocused: true, }, // обновляет данные для плэйлиста через 3сек (например для отслежевания роста графиков)
  )

  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  if (isLoading) return <div>Skeleton loader...</div>

  return (
    <div className={s.container}>
      <h1>Playlists Page</h1>
      <CreatePlaylistForm />
      <input type={"search"} placeholder={"Search playlist by title"} onChange={(e) => searchPlaylistHandler(e)} />
      <PlaylistList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  )
}
