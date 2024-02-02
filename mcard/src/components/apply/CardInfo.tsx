import { ApplyValues } from '@/models/apply'
import React, { MouseEvent, useState } from 'react'
import Button from '../shared/Button'
import FixedBottomButton from '../shared/FixedBottomButton'
import Spacing from '../shared/Spacing'

export type CardInfoType = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoType) => void
}) => {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoType>({
    isMaster: false,
    isHipass: false,
    isRf: false,
  })
  const { isHipass, isMaster, isRf } = cardInfoValues
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement
    setCardInfoValues((prev) => ({
      ...prev,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }
  return (
    <div>
      <Button.Group title="해외결제">
        <Button
          size="medium"
          weak={isMaster}
          data-value={true}
          name="isMaster"
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          size="medium"
          weak={!isMaster}
          data-value={false}
          name="isMaster"
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>
      <Spacing size={12} />
      <Button.Group title="후불교통기능">
        <Button
          size="medium"
          weak={isRf}
          data-value={true}
          name="isRf"
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          size="medium"
          weak={isRf}
          data-value={false}
          name="isRf"
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <Spacing size={12} />
      <Button.Group title="후불하이패스기능">
        <Button
          size="medium"
          weak={isHipass}
          data-value={true}
          name="isHipass"
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          size="medium"
          weak={isHipass}
          data-value={false}
          name="isHipass"
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <FixedBottomButton label="다음" onClick={() => onNext(cardInfoValues)} />
    </div>
  )
}

export default CardInfo
