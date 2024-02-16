import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants/collection';
import { Account } from '@/models/account';

export const setTerms = ({
  userId,
  termsId,
}: {
  userId: string;
  termsId: string[];
}) => {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termsId,
  });
};
export const getTerms = async (userId: string) => {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId)
  );
  if (snapshot.exists() === false) {
    return null;
  }
  return {
    id: snapshot.id,
    ...(snapshot.data() as { useId: string; termsId: string[] }),
  };
};

export const createAccount = (newAccount: Account) => {
  return setDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), newAccount.userId),
    newAccount
  );
};

export const getAccount = async (userId: string) => {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId)
  );
  if (snapshot.exists() === false) {
    return null;
  }
  return {
    id: snapshot.id,
    ...(snapshot.data() as Account),
  };
};

export const updateAccountBalance = (userId: string, balance: number) => {
  const snapshot = doc(collection(store, COLLECTIONS.ACCOUNT), userId);
  return updateDoc(snapshot, { balance });
};
