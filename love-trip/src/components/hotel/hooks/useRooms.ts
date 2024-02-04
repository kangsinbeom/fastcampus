import { COLLECTION } from '@/constants'
import { Room } from '@/models/room'
import { store } from '@/remote/firebase'
import { getRooms } from '@/remote/room'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

const useRooms = ({ hotelId }: { hotelId: string }) => {
  const client = useQueryClient()
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTION.HOTEL, hotelId), COLLECTION.ROOM),
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }))
        client.setQueryData(['rooms', hotelId], newRooms)
      },
    )
    return unsubscribe
  }, [hotelId, client])
  return useQuery(['rooms', hotelId], () => getRooms(hotelId))
}

export default useRooms
