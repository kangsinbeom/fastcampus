import Account from '@/components/home/Account';
import { CardListSkeleton } from '@/components/home/CardList';
import { CreditScoreSkeleton } from '@/components/home/CreditScore';
import { BannerSkeleton } from '@/components/home/EventBanners';
import Spacing from '@/components/shared/Spacing';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  loading: () => <BannerSkeleton />, // suspnese와 같이 사용할 때 로딩중에 그려줄 것을 보여줌 레이아웃 시프트도 방지할 수 있다
  ssr: false, // 서버사이드 랜더링할지 말지에 대해서 결정하는 것
});
const CreditScore = dynamic(() => import('@/components/home/CreditScore'), {
  loading: () => <CreditScoreSkeleton />,
  ssr: false,
});
const CardList = dynamic(() => import('@/components/home/CardList'), {
  loading: () => <CardListSkeleton />,
  ssr: false,
});

export default function Home() {
  const { data } = useSession();
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="gray100" />
      <CardList />
      {/* 자산의 경우 유저에게 보여줘야하는 중요정보이기에 서버단계에서 정보를 채워서 내려줄 것임 
      그렇기에 클라이언트에서 조작할 필요가 없다 === 다이나믹을 쓸 필요가 없다. */}
    </>
  );
}
