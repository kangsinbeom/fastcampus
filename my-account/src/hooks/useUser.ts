import { User } from '@/models/user';
import { useSession } from 'next-auth/react';

const useUser = () => {
  const { data } = useSession();
  return data == null ? null : (data.user as User);
};

export default useUser;
