import { FormValues } from '@/models/signup'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'
import FixedBottomButton from '../shared/FixedBottomButton'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import TextField from '../shared/TextField'

const Form = ({
  handleSubmit,
}: {
  handleSubmit: (formValue: FormValues) => void
}) => {
  const [formValue, setFormValue] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }))
  }, [])

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValue), [formValue])
  const isPossible = Object.keys(errors).length === 0
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        value={formValue.email}
        onChange={onChange}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        value={formValue.password}
        onChange={onChange}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        type="password"
        name="rePassword"
        value={formValue.rePassword}
        onChange={onChange}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        value={formValue.name}
        onChange={onChange}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />
      <FixedBottomButton
        label="회원가입"
        disabled={isPossible === false}
        onClick={() => handleSubmit(formValue)}
      />
    </Flex>
  )
}
const formContainerStyles = css`
  padding: 24px;
`

const validate = (formValue: FormValues) => {
  let errors: Partial<FormValues> = {}
  if (validator.isEmail(formValue.email) === false) {
    errors.email = '이메일을 확인해주세요'
  }

  if (formValue.password.length < 8) {
    errors.email = '비밀번호를 8글자 이상 입력해주세요'
  }

  if (formValue.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요'
  } else if (
    validator.equals(formValue.password, formValue.rePassword) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }
  if (formValue.name.length < 2) {
    errors.name = '이름은 2글자 이상 작성해주세요'
  }
  return errors
}

export default Form
