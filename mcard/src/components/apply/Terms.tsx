import { 약관목록 } from '@/constants/apply'
import { ApplyValues } from '@/models/apply'
import { MouseEvent, useCallback, useState } from 'react'
import Agreenemt from '../shared/Agreement'
import FixedBottomButton from '../shared/FixedBottomButton'

const Terms = ({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void
}) => {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })
  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const 모든약관이_동의되었는가 = Object.values(termsAgreements).every(
    (동의여부) => 동의여부,
  )
  return (
    <div>
      <Agreenemt>
        <Agreenemt.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreenemt.Title>
        {약관목록.map(({ id, link, title }) => (
          <Agreenemt.Description
            key={id}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
            link={link}
          >
            {title}
          </Agreenemt.Description>
        ))}
      </Agreenemt>
      <FixedBottomButton
        label="약관동의"
        disabled={!모든약관이_동의되었는가}
        onClick={() => onNext(Object.keys(termsAgreements))}
      />
    </div>
  )
}

export default Terms
