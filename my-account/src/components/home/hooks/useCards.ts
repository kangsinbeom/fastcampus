import { getCards } from '@/remote/card';
import React from 'react';
import { useQuery } from 'react-query';

const useCards = () => {
  return useQuery(['cards'], () => getCards(), { suspense: true });
};

export default useCards;
