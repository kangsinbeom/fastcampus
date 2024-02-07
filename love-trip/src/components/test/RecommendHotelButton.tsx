import { COLLECTION } from '@/constants'
import { store } from '@/remote/firebase'
import Button from '@shared/Button'
import { collection, getDocs, writeBatch } from 'firebase/firestore'

const RecommendHotelButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTION.HOTEL))
    snapshot.docs.forEach((hotel) => {
      const 추천호텔리스트 = []
      for (let doc of snapshot.docs) {
        if (추천호텔리스트.length === 5) break
        if (doc.id !== hotel.id) {
          추천호텔리스트.push(doc.id)
        }
      }
      batch.update(hotel.ref, {
        recommendHotels: 추천호텔리스트,
      })
    })
    await batch.commit()
    alert('업데이트 완료')
  }
  return <Button onClick={handleButtonClick}>추천호텔 데이터 추가하기</Button>
}

export default RecommendHotelButton
