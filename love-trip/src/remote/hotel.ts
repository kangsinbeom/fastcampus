import { COLLECTION } from '@/constants'
import { Hotel } from '@/models/hotel'
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
import { store } from './firebase'

export const getHotels = async (pageParams?: QuerySnapshot<Hotel>) => {
  const htoelQuery =
    pageParams == null
      ? query(collection(store, COLLECTION.HOTEL), limit(10))
      : query(
          collection(store, COLLECTION.HOTEL),
          startAfter(pageParams),
          limit(10),
        )
  const hotelsSnapshot = await getDocs(htoelQuery)
  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      }) as Hotel,
  )
  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]
  return {
    items,
    lastVisible,
  }
}

export const getHotel = async (id: string) => {
  const snapshot = await getDoc(doc(store, COLLECTION.HOTEL, id))
  return {
    id,
    ...snapshot.data(),
  } as Hotel
}
