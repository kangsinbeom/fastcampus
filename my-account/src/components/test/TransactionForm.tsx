import { ChangeEvent, useState } from 'react';
import TextField from '../shared/TextField';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import Select from '../shared/Select';
import Button from '../shared/Button';
import { getAccount, updateAccountBalance } from '@/remote/account';
import { createTransaction } from '@/remote/transaction';
import { Transaction } from '@/models/transaction';

const TransactionForm = () => {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit',
    amount: '',
    displayText: '',
  });
  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId);
    if (!account)
      return window.alert('해당 유저는 계좌를 보유하고 있지 않습니다');
    if (
      formValues.type === 'withdraw' &&
      account.balance - Number(formValues.amount) < 0
    )
      return window.alert(
        `지금 유저의 잔액은 ${account.balance}원입니다. 잔액이 0이하가 될 수 없어요`
      );
    const balance =
      formValues.type === 'withdraw'
        ? account.balance - Number(formValues.amount)
        : account.balance + Number(formValues.amount);

    const newTransaction = {
      ...formValues,
      amount: Number(formValues.amount),
      date: new Date().toISOString(),
      balance,
    } as Transaction;

    Promise.all([
      createTransaction(newTransaction),
      updateAccountBalance(formValues.userId, balance),
    ]);
    window.alert('입출금 데이터 생성 완료');
  };

  return (
    <Flex direction="column">
      <TextField
        name="userId"
        label="유저아이디"
        value={formValues.userId}
        onChange={handleFormValues}
      />
      <Select
        name="type"
        value={formValues.type}
        onChange={handleFormValues}
        options={[
          {
            label: '입금',
            value: 'deposite',
          },
          {
            label: '출금',
            value: 'withdraw',
          },
        ]}
      />
      <Spacing size={8} />
      <TextField
        label="입출금 금액"
        name="amount"
        value={formValues.amount}
        onChange={handleFormValues}
      />
      <Spacing size={8} />
      <TextField
        label="화면에 노출할 텍스트"
        name="displayText"
        value={formValues.displayText}
        onChange={handleFormValues}
      />
      <Spacing size={8} />
      <Button onClick={handleSubmit}>
        {formValues.type === 'deposite' ? '입금' : '출금'}
      </Button>
    </Flex>
  );
};

export default TransactionForm;
