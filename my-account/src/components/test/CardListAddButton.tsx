import { collection, doc, writeBatch } from 'firebase/firestore';
import Button from '../shared/Button';
import { store } from '@/remote/firebase';
import { card_list } from '@/mock/card';
import { COLLECTIONS } from '@/constants/collection';

const CardListAddButton = () => {
  const handleClickButton = async () => {
    const batch = writeBatch(store);
    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD));
      batch.set(docRef, card);
    });
    await batch.commit();
    alert('카드 리스트 추가 완료');
  };
  return <Button onClick={handleClickButton}>카드 리스트 추가</Button>;
};

export default CardListAddButton;
