import { COLLECTION } from '@/constants'
import { AdBanner, Card } from '@/models/card'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { last } from 'lodash'
import { store } from './firebase'

export const getCards = async (pageParam: QuerySnapshot<Card>) => {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTION.CARD), limit(10))
      : query(
          collection(store, COLLECTION.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapShot = await getDocs(cardQuery)

  const lastVisible = cardSnapShot.docs[cardSnapShot.docs.length - 1]
  const items = cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}
export const getAdBanners = async () => {
  const adBannerSnapShot = await getDocs(
    collection(store, COLLECTION.ADDBANNER),
  )
  return adBannerSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}

export const getCard = async (id: string) => {
  const snapShot = await getDoc(doc(store, COLLECTION.CARD, id))
  return {
    id,
    ...(snapShot.data() as Card),
  }
}
