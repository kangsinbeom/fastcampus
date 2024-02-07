import useUser from '@/hooks/auth/useUser'
import { getReviews, removeReview, writeReview } from '@/remote/review'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const useReview = ({ hotelId }: { hotelId: string }) => {
  const user = useUser()
  const client = useQueryClient()
  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )

  // 프로미스를 반환하는 뮤테이트 어싱크를 통해서 사용처에서 흐름을 제어할 수 있다.

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      }
      await writeReview(newReview)
      return true
    },
    {
      onSuccess: () => client.invalidateQueries(['reviews', hotelId]),
    },
  )
  const { mutate: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId })
    },
    {
      onSuccess: () => client.invalidateQueries(['reviews', hotelId]),
    },
  )

  return { data, isLoading, write, remove }
}

export default useReview
