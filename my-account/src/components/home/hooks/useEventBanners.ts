import { getEventBanners } from '@/remote/banner';
import { useQuery } from 'react-query';

const useEventBanners = () => {
  return useQuery(
    ['eventBanners'],
    () => getEventBanners({ hasAccount: false }),
    {
      suspense: true,
    }
  );
};

export default useEventBanners;
