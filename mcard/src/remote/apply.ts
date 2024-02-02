import { COLLECTION } from '@/constants'
import { ApplyValues } from '@/models/apply'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'

export const applyCard = (applyValues: ApplyValues) => {
  return addDoc(collection(store, COLLECTION.CARD_APPLY), applyValues)
}

export const upadteApplyCard = async ({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) => {
  const snapShot = await getDocs(
    query(
      collection(store, COLLECTION.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )
  const [applied] = snapShot.docs
  updateDoc(applied.ref, applyValues)
}
