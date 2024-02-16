import { 약관목록 } from '@/constants/account';
import { Term } from '@/models/account';
import { MouseEvent, useState } from 'react';
import Agreenemt from '../shared/Agreement';
import dynamic from 'next/dynamic';
const FixedBottomButton = dynamic(() => import('../shared/FixedBottomButton'));

const Terms = ({ onNext }: { onNext: (termIds: string[]) => void }) => {
  const [termsAgreement, setTermsAgreement] = useState(() =>
    generateInitialValues(약관목록)
  );
  const handleAllAgreement = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreement((prev) => prev.map((term) => ({ ...term, checked })));
  };
  const handleAgreement = (id: string, checked: boolean) => {
    setTermsAgreement((prev) =>
      prev.map((term) => (term.id === id ? { ...term, checked } : term))
    );
  };
  const 모든약관이동의되었는가 = termsAgreement.every((term) => term.checked);
  const 모든필수약관이동의되었는가 = termsAgreement
    .filter((term) => term.mandatory)
    .every((term) => term.checked);
  return (
    <div>
      <Agreenemt>
        <Agreenemt.Title
          checked={모든약관이동의되었는가}
          onChange={handleAllAgreement}
        >
          약관 모두 동의
        </Agreenemt.Title>
        {termsAgreement.map((term) => (
          <Agreenemt.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, cheked) => handleAgreement(term.id, cheked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreenemt.Description>
        ))}
      </Agreenemt>
      <FixedBottomButton
        label="약관동의"
        disabled={모든필수약관이동의되었는가 === false}
        onClick={() =>
          onNext(
            termsAgreement.filter((term) => term.checked).map(({ id }) => id)
          )
        }
      />
    </div>
  );
};

function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }));
}

export default Terms;
