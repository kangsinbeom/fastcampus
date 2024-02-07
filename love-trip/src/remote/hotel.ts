import { COLLECTION } from '@/constants'
import { Hotel } from '@/models/hotel'
import { Room } from '@/models/room'
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
  where,
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

export const getRecommendHotels = async (hotelIds: string[]) => {
  const recommendQuery = query(
    collection(store, COLLECTION.HOTEL),
    where(documentId(), 'in', hotelIds),
  )

  const snapshot = await getDocs(recommendQuery)

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )
}

export const getHotelWithRoom = async ({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) => {
  const hotelSnapshot = await getDoc(doc(store, COLLECTION.HOTEL, hotelId))
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot.ref, COLLECTION.ROOM, roomId),
  )
  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  }
}
