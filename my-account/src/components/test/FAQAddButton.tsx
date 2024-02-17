import { collection, doc, writeBatch } from 'firebase/firestore';
import Button from '../shared/Button';
import { store } from '@/remote/firebase';
import { COLLECTIONS } from '@/constants/collection';

const FAQS = [
  {
    question: 'MyAccont는 어떤 서비스인가요1',
    answer: '유저에게 ㅍㄴ리한 경험을 제공해주는 자산 서비스입니다.1',
  },
  {
    question: 'MyAccont는 어떤 서비스인가요2',
    answer: '유저에게 ㅍㄴ리한 경험을 제공해주는 자산 서비스입니다.2',
  },
  {
    question: 'MyAccont는 어떤 서비스인가요3',
    answer: '유저에게 ㅍㄴ리한 경험을 제공해주는 자산 서비스입니다.3',
  },
];

const FAQAddButton = () => {
  const handleButtonClick = () => {
    const batch = writeBatch(store);
    FAQS.forEach((faq) => {
      const docRef = doc(collection(store, COLLECTIONS.FAQ));
      batch.set(docRef, faq);
      batch.commit().then(() => {
        window.alert('FAQ 데이터 추가');
      });
    });
  };
  return <Button onClick={handleButtonClick}>FAQ 데이터 추가</Button>;
};

export default FAQAddButton;
