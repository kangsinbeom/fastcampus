import { COLLECTION } from '@/constants'
import { Review } from '@/models/review'
import { User } from '@/models/user'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { store } from './firebase'

export const getReviews = async ({ hotelId }: { hotelId: string }) => {
  const hotelRef = doc(collection(store, COLLECTION.HOTEL), hotelId)
  const reviewQuery = query(
    collection(hotelRef, COLLECTION.REVIEW),
    orderBy('createdAt', 'desc'),
  )
  const reviewSnapshot = await getDocs(reviewQuery)

  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()
    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review
  })
  // 동일한 유저가 댓글을 달았을 떄 매번 유저의 정보를 불러오는 건 비효율적이니 캐시하자
  const userMap: {
    [key: string]: User
  } = {}
  const result: Array<Review & { user: User }> = []
  for (let review of reviews) {
    const 캐시된유저 = userMap[review.userId]
    if (!캐시된유저) {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTION.USER), review.userId),
      )
      const user = userSnapshot.data() as User
      userMap[review.userId] = user
      result.push({
        ...review,
        user,
      })
    } else {
      result.push({
        ...review,
        user: 캐시된유저,
      })
    }
  }
  return result
}

export const writeReview = (review: Omit<Review, 'id'>) => {
  const hotelRef = doc(store, COLLECTION.HOTEL, review.hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTION.REVIEW))
  return setDoc(reviewRef, review)
}

export const removeReview = ({
  reviewId,
  hotelId,
}: {
  reviewId: string
  hotelId: string
}) => {
  const hotelRef = doc(store, COLLECTION.HOTEL, hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTION.REVIEW), reviewId)
  return deleteDoc(reviewRef)
}
