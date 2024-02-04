import { COLLECTION } from '@/constants'
import { EVENTS, HOTEL, HOTEL_NAMES, IMAGES, ROOMS } from '@/mock/data'
import { store } from '@/remote/firebase'
import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

function random(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const HotelListAddButton = () => {
  const batch = writeBatch(store)
  const handleButtonClick = () => {
    const hotels = HOTEL_NAMES.map((hotelName, index) => ({
      name: hotelName,
      mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
      images: IMAGES,
      price: random(130000, 200000),
      starRating: random(1, 5),
      ...HOTEL,
      ...(EVENTS[index] != null && { event: EVENTS[index] }),
    }))
    hotels.forEach((hotel) => {
      const hotelDocRef = doc(collection(store, COLLECTION.HOTEL))

      batch.set(hotelDocRef, hotel)

      ROOMS.forEach((room) => {
        const subDocRef = doc(collection(hotelDocRef, COLLECTION.ROOM))

        batch.set(subDocRef, room)
      })
    })
    batch.commit()
  }

  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}

export default HotelListAddButton
