import { useQuery } from 'react-query';
import useUser from './useUser';
import { getAccount } from '@/remote/account';

const useAccount = () => {
  const user = useUser();
  return useQuery(['account', user?.id], () => getAccount(user?.id as string), {
    enabled: !!user,
  });
};

export default useAccount;
