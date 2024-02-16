import useAccount from '@/hooks/useAccount';
import { getEventBanners } from '@/remote/banner';
import { useQuery } from 'react-query';

const useEventBanners = () => {
  const { data: account } = useAccount();
  return useQuery(
    ['eventBanners'],
    () =>
      getEventBanners({ hasAccount: !!account && account.status === 'DONE' }),
    {
      suspense: true,
    }
  );
};

export default useEventBanners;
