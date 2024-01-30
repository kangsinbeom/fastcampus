import { SigninValue } from '@/models/signin'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import FixedBottomButton from '../shared/FixedBottomButton'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import TextField from '../shared/TextField'

const Form = ({
  handleSubmit,
}: {
  handleSubmit: (formValue: SigninValue) => void
}) => {
  const [formValue, setFormValue] = useState<SigninValue>({
    email: '',
    password: '',
  })
  const [dirty, setDirty] = useState<Partial<SigninValue>>({})

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

      <FixedBottomButton
        label="회원가입"
        disabled={isPossible === false}
        onClick={() => handleSubmit(formValue)}
      />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}
const formContainerStyles = css`
  padding: 24px;
`
const linkStyles = css`
  text-align: center;
  & > span:hover {
    color: ${colors.blue};
  }
`

const validate = (formValue: SigninValue) => {
  let errors: Partial<SigninValue> = {}
  if (validator.isEmail(formValue.email) === false) {
    errors.email = '이메일을 확인해주세요'
  }

  if (formValue.password.length < 8) {
    errors.email = '비밀번호를 8글자 이상 입력해주세요'
  }
  return errors
}

export default Form
