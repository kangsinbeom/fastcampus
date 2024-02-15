import useCredit from '@/components/credit/hooks/useCredit';
import CreditScoreChart from '@/components/shared/CreditScoreChart';
import Flex from '@/components/shared/Flex';
import ListRow from '@/components/shared/ListRow';
import Spacing from '@/components/shared/Spacing';
import Text from '@/components/shared/Text';
import { useAlertContext } from '@/contexts/AlertContext';
import useUser from '@/hooks/useUser';
import { User } from '@/models/user';
import { getCredit } from '@/remote/credit';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { QueryClient, dehydrate } from 'react-query';

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  { ssr: false }
);

const CreditPage = () => {
  const user = useUser();
  const navigate = useRouter();
  const { open } = useAlertContext();
  const { data } = useCredit();
  const handleCheck = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다',
        description: '정확한 신용정보를 확인하기 위해서 로그인해주세요',
        onButtonClick: () => {
          navigate.push('/auth/signup');
        },
      });
      return;
    }
    navigate.push('/credit/check');
  }, [navigate, open, user]);
  return data != null ? (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold={true} textAlign="center">
          나의 신용점수
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={data.creditScore} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="추천카드"
              subTitle="나에게 맞는 카드 찾아보기"
            />
          }
          withArrow={true}
          onClick={() => {
            navigate.push('/card');
          }}
        />
      </ul>
      <FixedBottomButton label="신용점수 올리기" onClick={handleCheck} />
    </div>
  ) : (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold={true} textAlign="center">
          내 신용점수를
          <br />
          조회하고 관리해보세요
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="정확한 신용평점"
              subTitle="대표 신용 평가 기관의 데이터로 관리해요"
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Texts
              title="신용평점 무료 조회"
              subTitle="신용점수에 영향 없이 무료로 조회 가능해요"
            />
          }
        />
      </ul>
      <FixedBottomButton
        label="30초만에 신용점수 조회하기"
        onClick={handleCheck}
      />
    </div>
  );
};

async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!!session && !!session.user) {
    const client = new QueryClient();
    await client.prefetchQuery(['credit', (session.user as User).id], () =>
      getCredit((session.user as User).id)
    );
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    };
  }
}

export default CreditPage;
