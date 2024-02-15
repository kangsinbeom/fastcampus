import { CHECK_STATUS } from '@/constants/credit';
import { useQuery } from 'react-query';

interface useCreditCheckProps {
  onSuccess: (creditScore: number) => void;
  onError: () => void;
  enabled: boolean;
}

const useCreditCheck = ({
  onError,
  onSuccess,
  enabled,
}: useCreditCheckProps) => {
  return useQuery(['useCreditCheck'], () => getCheckStatus(), {
    enabled,
    refetchInterval: 2_000,
    staleTime: 0,
    onSuccess: (status) => {
      console.log(status);
      if (status == CHECK_STATUS.COMPLETE) {
        onSuccess(getCreditScore(200, 1000));
      }
    },
    onError,
  });
};
const getCheckStatus = () => {
  const values = [
    CHECK_STATUS.READY,
    CHECK_STATUS.PROGRESS,
    CHECK_STATUS.COMPLETE,
    CHECK_STATUS.REJECT,
  ];
  const status = values[Math.floor(Math.floor(Math.random() * values.length))];
  console.log('status', status);
  if (status === CHECK_STATUS.REJECT) {
    throw new Error('신용점수 조회를 실패했습니다');
  }
  return status;
};

function getCreditScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default useCreditCheck;
