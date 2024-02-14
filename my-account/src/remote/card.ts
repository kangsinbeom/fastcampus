import { Card } from '@/models/card';
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants/collection';

export const getCards = async (pageParam?: QuerySnapshot<Card>) => {
  // null 인 경우는 첫 호출
  const cardQuery =
    pageParam === null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          limit(15),
          startAfter(pageParam)
        );
  const cardSnapshot = await getDocs(cardQuery);
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1];
  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));

  return { lastVisible, items };
};

export const getSearchCards = async (keyword: string) => {
  const searchQuery = query(
    collection(store, COLLECTIONS.CARD),
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff')
  );
  const searchSnapshot = await getDocs(searchQuery);
  return searchSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));
};

export const getCard = async (id: string) => {
  const snapshot = await getDoc(doc(collection(store, COLLECTIONS.CARD), id));

  return {
    id: snapshot.id,
    ...(snapshot.data() as Card),
  };
};
