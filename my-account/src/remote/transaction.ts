import {
  Transaction,
  TransactionFilterType,
  TransactionType,
} from '@/models/transaction';
import {
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants/collection';
import { start } from 'repl';

export const createTransaction = (newTransaction: Transaction) => {
  return setDoc(
    doc(collection(store, COLLECTIONS.TRANSACTION)),
    newTransaction
  );
};

export const getTransactions = async ({
  pageParam,
  userId,
  filter = 'all',
}: {
  pageParam?: QuerySnapshot<TransactionType>;
  userId: string;
  filter?: TransactionFilterType;
}) => {
  const transactionQuery = generateQuery({ userId, filter, pageParam });
  const transactionSnapshot = await getDocs(transactionQuery);
  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1];

  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }));
  return { items, lastVisible };
};

function generateQuery({
  filter,
  pageParam,
  userId,
}: {
  pageParam?: QuerySnapshot<TransactionType>;
  userId: string;
  filter?: TransactionFilterType;
}) {
  const baseQuery = query(
    collection(store, COLLECTIONS.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15)
  );
  if (filter !== 'all') {
    if (!pageParam) return query(baseQuery, where('type', '==', filter));
    return query(baseQuery, startAfter(pageParam), where('type', '==', filter));
  } else {
    if (!pageParam) return baseQuery;
  }
  return query(baseQuery, startAfter(pageParam));
}
