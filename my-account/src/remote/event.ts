import { collection, doc, getDoc } from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants/collection';
import { Event } from '@/models/event';

export const getEvent = async (id: string) => {
  const eventRef = doc(collection(store, COLLECTIONS.EVENT), id);
  const eventSnapshot = await getDoc(eventRef);
  return {
    id: eventSnapshot.id,
    ...(eventSnapshot.data() as Event),
  };
};
