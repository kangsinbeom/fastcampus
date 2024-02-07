import React from 'react'
import Button from '@shared/Button'
import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTION } from '@/constants'
import { FORMS } from '@/mock/data'

const HotelFormAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTION.HOTEL))
    snapshot.docs.forEach((hotel) => {
      batch.update(hotel.ref, { forms: FORMS })
    })
    await batch.commit()
    alert('completely add to data in docs')
  }
  return <Button onClick={handleButtonClick}>폼 데이터 추가</Button>
}

export default HotelFormAddButton
