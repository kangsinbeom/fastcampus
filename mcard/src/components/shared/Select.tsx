import { Optoin } from '@/models/apply'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import { forwardRef, SelectHTMLAttributes } from 'react'
import Flex from './Flex'
import Text from './Text'

interface SelectPorps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Optoin[]
  placeholder: string
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.gray};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: ${colors.blue};
  }
`
// 어떤 ref를 받을지 , 어떤 props를 받을지 타입 정의
const Select = forwardRef<HTMLSelectElement, SelectPorps>(function Select(
  { label, options, placeholder, value },
  ref,
) {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect required={true} ref={ref} value={value}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})
export default Select
