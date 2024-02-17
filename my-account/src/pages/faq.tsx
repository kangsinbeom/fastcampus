import ListRow from '@/components/shared/ListRow';
import { COLLECTIONS } from '@/constants/collection';
import { store } from '@/remote/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}
// clinetside로 바꾸고 싶을 때에는 useEffect와 useState를 통해서 변경을 하면 된다.
// getStaticProps를 없애야 함
const FAQPage = ({ faqs }: { faqs: FAQ[] }) => {
  return (
    <div>
      {faqs.map((faq) => (
        <ListRow
          key={faq.id}
          contents={
            <ListRow.Texts title={faq.question} subTitle={faq.answer} />
          }
        />
      ))}
    </div>
  );
};

async function getStaticProps() {
  const snapshot = await getDocs(collection(store, COLLECTIONS.FAQ));
  const faqs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return {
    porps: { faqs },
  };
}

export default FAQPage;

// ssg로 빌드되는지 확인하기 위해 yarn build를 실행을 해보자
// build 이후에 ssg를 확인하기 위해서 .next > server > pages > faq.html을 확인해봐
