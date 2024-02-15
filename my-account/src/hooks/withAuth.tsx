import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';
// 세션을 검사하는 컴포넌트임 세션이 비어있을 때에는 로그인 페이지로 이동을 시켜야 함
function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>
) {
  return function AuthenticatedComponent(props: Props) {
    const { data, status } = useSession();
    const navigate = useRouter();
    if (status != 'loading' && data == null) {
      navigate.replace('/auth/signin');
    }
    return <WrappedComponent {...(props as any)} />;
  };
}

export default withAuth;
