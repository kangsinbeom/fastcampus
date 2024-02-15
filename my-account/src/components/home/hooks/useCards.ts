import { getCards } from '@/remote/card';
import { useQuery } from 'react-query';

const useCards = () => {
  return useQuery(['home-cards'], () => getCards(), { suspense: true });
};

export default useCards;
