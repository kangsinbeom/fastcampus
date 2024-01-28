import { COLLECTION } from '@/constants'
import { AdBanner, Card } from '@/models/card'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export const getCards = async () => {
  const cardSnapShot = await getDocs(collection(store, COLLECTION.CARD))
  return cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
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
