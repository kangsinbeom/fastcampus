import { COLLECTION } from '@/constants'
import { Room } from '@/models/room'
import { collection, doc, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export const getRooms = async (hotelId: string) => {
  const snapshot = await getDocs(
    collection(doc(store, COLLECTION.HOTEL, hotelId), COLLECTION.ROOM),
  )
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
