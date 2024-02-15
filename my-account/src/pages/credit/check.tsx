import useCreditCheck from '@/components/credit/hooks/useCreditCheck';
import FixedBottomButton from '@/components/shared/FixedBottomButton';
import { CHECK_STATUS } from '@/constants/credit';
import { useAlertContext } from '@/contexts/AlertContext';
import useUser from '@/hooks/useUser';
import { updateCredit } from '@/remote/credit';
import { useState } from 'react';
import { useMutation } from 'react-query';

const CreditCheckPage = () => {
  const { open } = useAlertContext();
  const [readyToPoll, setReadyToPoll] = useState<boolean>(true);
  const user = useUser();
  const { mutate } = useMutation((creditScore: number) =>
    updateCredit({ creditScore, userId: user?.id as string })
  );
  const { data: status } = useCreditCheck({
    onSuccess: (creditScore) => {
      mutate(creditScore);
      setReadyToPoll(false);
    },
    onError: () => {
      setReadyToPoll(false);
      open({
        title: '신용점수 조회에 실패했습니다',
        description: '잠시 후 다시 시도해주세요',
        onButtonClick: () => {
          window.history.back();
        },
      });
    },
    enabled: readyToPoll,
  });
  return (
    <div>
      <div>loading...</div>
      {status === CHECK_STATUS.COMPLETE ? (
        <FixedBottomButton label="확인" onClick={() => window.history.back()} />
      ) : null}
    </div>
  );
};

export default CreditCheckPage;
