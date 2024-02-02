import BasicInfo, { InfoValues } from '@/components/apply/BasicInfo'
import CardInfo, { CardInfoType } from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import useUser from '@/hooks/useUser'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) => {
  const [step, setStep] = useState<number>(0)
  const user = useUser()
  const { id } = useParams() as { id: string }
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    useId: user?.uid,
    cardId: id,
  })

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [applyValues, onSubmit, step])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
    }))
    setStep((prev) => prev + 1)
  }
  const handleBasicInfoChange = (infoVlues: InfoValues) => {
    setApplyValues((prev) => ({
      ...prev,
      infoVlues,
    }))
    setStep((prev) => prev + 1)
  }
  const handleCardInfoChange = (cardInfoValues: CardInfoType) => {
    setApplyValues((prev) => ({
      ...prev,
      cardInfoValues,
    }))
    setStep((prev) => prev + 1)
  }
  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  )
}

export default Apply
