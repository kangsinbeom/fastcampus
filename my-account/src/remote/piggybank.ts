import { Piggybank } from '@/models/piggybank';
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants/collection';

export const createPiggybank = (newPiggybank: Piggybank) => {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggybank);
};

export const getPiggybank = async (userId: string) => {
  // 쿼리 조건을 만들었을 때에는 인덱스를 생성해야하는 것을 까먹지 말자
  const piggyQuery = query(
    collection(store, COLLECTIONS.PIGGYBANK),
    where('userId', '==', userId),
    where('endDate', '>=', new Date()),
    orderBy('endDate', 'asc'),
    limit(1)
  );
  const snpashot = await getDocs(piggyQuery);
  if (snpashot.docs.length === 0) return null;
  const piggybank = snpashot.docs[0].data();
  return {
    id: snpashot.docs[0].id,
    ...(piggybank as Piggybank),
    startDate: piggybank.startDate.toDate(),
    // firebase에서 저장 시 타입을 타임스탬프로 바꾸기에 바꾸는 작업을 해야한다
    endDate: piggybank.endDate.toDate(),
  };
};
