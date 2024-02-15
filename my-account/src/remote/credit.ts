import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants/collection';
import { Credit } from '@/models/credit';

export const updateCredit = ({
  userId,
  creditScore,
}: {
  userId: string;
  creditScore: number;
}) => {
  return setDoc(doc(collection(store, COLLECTIONS.CREDIT), userId), {
    userId,
    creditScore,
  });
};

export const getCredit = async (userId: string) => {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.CREDIT), userId)
  );
  if (snapshot.exists() === false) {
    return null;
  }
  return {
    id: snapshot.id,
    ...(snapshot.data() as Credit),
  };
};
