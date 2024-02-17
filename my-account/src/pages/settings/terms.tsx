import Button from '@/components/shared/Button';
import ListRow from '@/components/shared/ListRow';
import Text from '@/components/shared/Text';
import Top from '@/components/shared/Top';
import { 약관목록 } from '@/constants/account';
import useUser from '@/hooks/useUser';
import { User } from '@/models/user';
import { getTerms, updateTerms } from '@/remote/account';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useMemo } from 'react';
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

const TermsPage = ({}) => {
  const client = useQueryClient();
  const user = useUser();
  // 유저가 존재할 때만 데이터를 불러오기
  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: !!user,
    }
  );
  // useMutation은 어째서 termIds를 가지고 있는가? -1
  const { mutate, isLoading } = useMutation(
    (termIds: string[]) => updateTerms(user?.id as string, termIds),
    {
      onSuccess: () => {
        // client를 성공시에 재갱신하면서 리스트를 다시 불러오면 된다.
        client.invalidateQueries(['terms', user?.id]);
      },
      onError: () => {},
    }
  );
  const handleDisagree = (selectedTermId: string) => {
    // 삭제되길 원하는 값이 2라면 2를 찾아서 없애주는 것임
    const updatedTermIds = data?.termsId.filter(
      (termId) => selectedTermId !== termId
    );
    // 여기서 넣어주니깐 useMutation에 들어가는구나 -1
    if (updatedTermIds) mutate(updatedTermIds);
  };
  // 우리가 동의한 약관목록을 파악하기 위해서 구분을 해보자
  const 동의한약관목록 = useMemo(() => {
    if (!data) return null;
    // 우리가 가져온 데이터 안에 약관이 포함되어있는지 파악
    const 동의한전체약관목록 = 약관목록.filter(({ id }) =>
      data.termsId.includes(id)
    );
    const 필수약관 = 동의한전체약관목록.filter(({ mandatory }) => mandatory);
    const 선택약관 = 동의한전체약관목록.filter(({ mandatory }) => !mandatory);
    return { 필수약관, 선택약관 };
  }, [data]);
  return (
    <div>
      <Top title="약관" subTitle="약관 리스트 및 철회" />
      {동의한약관목록 ? (
        <ul>
          {동의한약관목록.필수약관.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수]${term.title}`} subTitle="" />
              }
            />
          ))}
          {동의한약관목록.선택약관.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택]${term.title}`} subTitle="" />
              }
              right={
                <Button
                  onClick={() => handleDisagree(term.id)}
                  disabled={!isLoading}
                >
                  철회
                </Button>
              }
            />
          ))}
        </ul>
      ) : (
        <Text>동의한 약관 목록이 없다.</Text>
      )}
    </div>
  );
};

async function getServerSideProps(context: GetServerSidePropsContext) {
  // 저장된 세션 정보 가져오기
  const session = await getSession(context);
  if (session && session.user) {
    const client = new QueryClient();
    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id)
    );
    return {
      props: {
        dehydrateState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    };
  }
  return {
    props: {},
  };
}

export default TermsPage;
