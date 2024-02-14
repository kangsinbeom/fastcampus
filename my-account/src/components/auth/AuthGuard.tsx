import { useSession } from 'next-auth/react';

// 인증이 완료된 상태로 그려지기 위해서는 꼭 필요하다~
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  // 세션을 감지하려면 꼭 필요한 훅임
  const { data, status } = useSession();
  if (status === 'loading') return null;

  return <>{children}</>;
};

export default AuthGuard;
