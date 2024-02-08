import { getHotels } from '@/remote/hotel'
import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'

const useHotels = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['hotels'], ({ pageParam }) => getHotels(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
    suspense: true,
  })

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) return
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const hotels = data?.pages.map(({ items }) => items).flat()

  return { data: hotels, loadMore, isFetching, hasNextPage }
}

export default useHotels
