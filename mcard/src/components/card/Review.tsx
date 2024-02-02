import React from 'react'
import { useQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
const Review = () => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const { data, isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(['asdfasdf', 'asdfasdf'])
        }, 2_000)
      })
    },
    {
      enabled: inView,
    },
  )

  return <div ref={ref}></div>
}

export default Review
