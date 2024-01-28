import { adBanners } from '@/mock/data'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTION } from '@/constants/index'
import Button from '../shared/Button'

const BannerAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTION.ADDBANNER))
      batch.set(docRef, banner)
    })
    await batch.commit()
    alert('completly add to banner')
  }

  return <Button onClick={handleButtonClick}>Add to Banner</Button>
}

export default BannerAddButton
