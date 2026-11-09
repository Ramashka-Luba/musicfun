import type { Images, User } from "@/common/types"
import type { CurrentUserReaction } from "@/common/enums"

export type TracksResponse = {
  data: TrackData[]
  meta: TrackMeta
  included: TracksIncluded[]
}

//Data
export type TrackData = {
  id: string
  type: "tracks"
  attributes: TrackAttributes
  relationships: TrackRelationships
}

export type TrackAttributes = {
  title: string
  addedAt: string
  likesCount: number
  attachments: TrackAttachment[]
  images: Images
  user: User
  currentUserReaction: CurrentUserReaction
  isPublished: boolean
  publishedAt: string | null
  duration: number
}

export type TrackAttachment = {
  id: string
  addedAt: string
  updatedAt: string
  version: number
  url: string
  contentType: string
  originalName: string
  fileSize: number
}

export type TrackRelationships = {
  artists: {
    data: {
      id: string
      type: string
    }
  }
}

//Meta
export type TrackMeta = {
  page: number
  pageSize: number
  totalCount: number | null
  pagesCount: number | null
  nextCursor: string | null
}

//Included
export type TracksIncluded = {
  id: string
  type: string
  attributes: {
    name: string
  }
}

// Arguments
export type FetchTracksArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: "publishedAt" | "likesCount"
  sortDirection?: "asc" | "desc"
  tagsIds?: string[]
  artistsIds?: string[]
  userId?: string
  includeDrafts?: boolean
  onlyLikedByMe?: boolean
  paginationType?: "offset" | "cursor"
  cursor?: string | null
}
