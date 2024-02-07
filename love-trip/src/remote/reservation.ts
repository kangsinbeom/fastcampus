import { COLLECTION } from '@/constants'
import { Reservation } from '@/models/reservation'
import { Room } from '@/models/room'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { getHotel } from './hotel'

export const makeReservation = async (newReservation: Reservation) => {
  const hotelSnapshot = doc(store, COLLECTION.HOTEL, newReservation.hotelId)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTION.ROOM, newReservation.roomId),
  )
  const room = roomSnapshot.data() as Room
  const 지금잔여객실수 = room.availableCount

  if (지금잔여객실수 === 0) {
    throw new Error('no room')
  }
  return Promise.all([
    updateDoc(roomSnapshot.ref, { availableCount: 지금잔여객실수 - 1 }),
    setDoc(doc(collection(store, COLLECTION.RESERVATION)), newReservation),
  ])
}

export const getReservations = async ({ userId }: { userId: string }) => {
  const reservationQuery = query(
    collection(store, COLLECTION.RESERVATION),
    where('userId', '==', userId),
  )
  const result = []
  const reservationSnapshot = await getDocs(reservationQuery)
  for (const reservationDoc of reservationSnapshot.docs) {
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    }
    const hotel = await getHotel(reservation.hotelId)
    result.push({ reservation, hotel })
  }
  return result
}
