import { 결재일옵션, 신용점수옵션, 연소득옵션 } from '@/constants/apply'
import { ApplyValues } from '@/models/apply'
import { ChangeEvent, useCallback, useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'
import Select from '../shared/Select'

export type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

const BasicInfo = ({
  onNext,
}: {
  onNext: (infovalues: InfoValues) => void
}) => {
  const [infoValue, setInfoValue] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleinfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])
  const 모든정보가선택되었는가 = Object.values(infoValue).every(
    (value) => value,
  )

  return (
    <div>
      <Select
        label="연소득"
        name="salary"
        value={infoValue.salary}
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        onChange={handleinfoChange}
      />
      <Select
        label="연소득"
        name="creditScore"
        value={infoValue.creditScore}
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        onChange={handleinfoChange}
      />
      <Select
        label="연소득"
        name="payDate"
        value={infoValue.payDate}
        options={결재일옵션}
        placeholder={결재일옵션[0].label}
        onChange={handleinfoChange}
      />
      <FixedBottomButton
        label="다음"
        onClick={() => onNext(infoValue)}
        disabled={!모든정보가선택되었는가}
      />
    </div>
  )
}

export default BasicInfo
