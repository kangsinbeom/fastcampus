import Flex from '@/components/shared/Flex';
import TextField from '@/components/shared/TextField';
import { useAlertContext } from '@/contexts/AlertContext';
import useUser from '@/hooks/useUser';
import withAuth from '@/hooks/withAuth';
import { Piggybank } from '@/models/piggybank';
import { createPiggybank } from '@/remote/piggybank';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton')
);

const NewPiggybankPage = () => {
  const user = useUser();
  const { open } = useAlertContext();
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  });
  const { mutate, isLoading } = useMutation(
    (newPiggybank: Piggybank) => createPiggybank(newPiggybank),
    {
      onSuccess: () => {
        open({
          title: '저금통 만듬',
          onButtonClick: () => window.history.back(),
        });
      },
      onError: () => {
        open({
          title: '저금통 만들기 실패',
          onButtonClick: () => window.history.back(),
        });
      },
    }
  );

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const handleSubmit = () => {
    const newPiggybank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as Piggybank;
    mutate(newPiggybank);
  };
  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  return (
    <Flex>
      <TextField
        name="name"
        label="이름"
        type="text"
        value={formValues.name}
        onChange={handleFormValues}
      />
      <TextField
        name="endDate"
        label="종료일자"
        type="date"
        min={minDate}
        value={formValues.endDate}
        onChange={handleFormValues}
      />
      <TextField
        name="goalAmount"
        label="목표금액"
        type="number"
        value={formValues.goalAmount}
        onChange={handleFormValues}
      />
      <FixedBottomButton
        disabled={isLoading}
        label="저금통 생성하기"
        onClick={handleSubmit}
      />
    </Flex>
  );
};

export default withAuth(NewPiggybankPage);
