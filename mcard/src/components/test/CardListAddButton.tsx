import { COLLECTION } from '@/constants'
import { card_list } from '@/mock/data'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '../shared/Button'

const CardListAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTION.CARD))
      batch.set(docRef, card)
    })
    await batch.commit()
    alert('completly add to cards')
  }

  return <Button onClick={handleButtonClick}>Add to CardList</Button>
}

export default CardListAddButton
