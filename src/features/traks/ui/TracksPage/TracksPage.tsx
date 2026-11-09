import { useFetchTracksInfiniteQuery } from "@/features/traks/api/tracksApi.tsx"
import { TrackList } from "@/features/traks/ui/TracksPage/TrackList/TrackList.tsx"
import { LoadingTrigger } from "@/features/traks/ui/TracksPage/TrackList/LoadingTrigger/LoadingTrigger.tsx"
import { useInfiniteScroll } from "@/common/hooks"

export const TracksPage = () => {
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useFetchTracksInfiniteQuery()

  const { observerRef } = useInfiniteScroll({ isFetching, hasNextPage, fetchNextPage })

  // const pages = data?.pages.map((page) => page.data).flat() || []
  const pages = data?.pages.flatMap((page) => page.data) || []

  return (
    <div>
      <h1>TracksPage</h1>
      <TrackList tracks={pages} />

      {hasNextPage && <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage} />}

      {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
    </div>
  )
}
