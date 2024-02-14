import { collection, doc, writeBatch } from 'firebase/firestore';
import Button from '@shared/Button';
import { store } from '@remote/firebase';
import { EVENT_BANNERS } from '@mock/banner';
import { COLLECTIONS } from '@constants/collection';

const EventAddBannerButton = () => {
  const handleButtonCLick = async () => {
    const batch = writeBatch(store);
    EVENT_BANNERS.forEach((banner) => {
      const bannerRef = doc(collection(store, COLLECTIONS.BANNER));
      batch.set(bannerRef, banner);
    });
    await batch.commit();

    alert('배너 추가 완료');
  };
  return <Button onClick={handleButtonCLick}>이벤트 베너 데이터 추가</Button>;
};

export default EventAddBannerButton;
