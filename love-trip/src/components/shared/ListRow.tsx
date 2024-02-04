import { css, SerializedStyles } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  styles?: SerializedStyles
}

const ListRow = ({
  left,
  contents,
  right,
  withArrow,
  as = 'li',
  onClick,
  styles,
}: ListRowProps) => {
  return (
    <Flex
      as={as}
      css={[listRowContainerStyles, styles]}
      align="center"
      onClick={onClick}
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? <div>화살표</div> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`

const ListRowTexts = ({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: string
}) => {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

ListRow.Texts = ListRowTexts

export default ListRow
