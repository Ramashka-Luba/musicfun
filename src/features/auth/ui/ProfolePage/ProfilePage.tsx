import { useGetMeQuery } from "@/features/auth/api/authApi.ts"

export const ProfilePage = () => {
  const { data } = useGetMeQuery()

  return <div>{data?.login}</div>
}
