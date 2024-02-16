import Form from '@/components/account/Form';
import Terms from '@/components/account/Terms';

import useUser from '@/hooks/useUser';
import withAuth from '@/hooks/withAuth';
import { Account } from '@/models/account';
import { User } from '@/models/user';
import {
  createAccount,
  getAccount,
  getTerms,
  setTerms,
} from '@/remote/account';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton')
);

const AccountNew = ({ initalStep }: { initalStep: number }) => {
  const user = useUser();
  const navigate = useRouter();
  const [step, setStep] = useState<number>(initalStep);

  return (
    <div>
      {step === 0 ? (
        <Terms
          onNext={async (termsId) => {
            await setTerms({ userId: user?.id as string, termsId });
            setStep(step + 1);
          }}
        />
      ) : null}
      {step === 1 ? (
        <Form
          onNext={async (formValues) => {
            const newAccount = {
              ...formValues,
              accountNumber: Date.now(),
              balance: 0,
              status: 'READY',
              userId: user?.id as string,
            } as Account;
            await createAccount(newAccount);
            setStep(step + 1);
          }}
        />
      ) : null}
      {step === 2 ? (
        <FixedBottomButton label="확인" onClick={() => navigate.push('/')} />
      ) : null}
    </div>
  );
};

async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const agreeTerms = await getTerms((session?.user as User).id);
  if (agreeTerms == null) {
    return {
      props: {
        initalStep: 0,
      },
    };
  }
  const account = await getAccount((session?.user as User).id);

  if (account == null) {
    return {
      props: {
        initalStep: 1,
      },
    };
  }

  return {
    props: {
      initalStep: 2,
    },
  };
}

export default withAuth(AccountNew);
