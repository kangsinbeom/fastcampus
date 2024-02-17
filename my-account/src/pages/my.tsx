import Button from '@/components/shared/Button';
import Flex from '@/components/shared/Flex';
import ListRow from '@/components/shared/ListRow';
import Spacing from '@/components/shared/Spacing';
import withAuth from '@/hooks/withAuth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const MyPage = () => {
  const navigate = useRouter();
  return (
    <div>
      <Spacing size={100} />
      <Flex justify="center">
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '24px 0' }}
      />
      {/* 마이페이지에 약관에 대해서 조작을 할 수 있는 영역 */}
      <ListRow
        contents={<ListRow.Texts title="약관" subTitle="약관 목록 및 철회" />}
        withArrow={true}
        onClick={() => navigate.push('/settings/terms')}
      />
    </div>
  );
};

export default withAuth(MyPage);
