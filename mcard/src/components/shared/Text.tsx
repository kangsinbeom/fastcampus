import { Colors, colors } from '@/styles/colorPalette'
import { Typography, typographyMap } from '@/styles/typography'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'

interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeigth?: CSSProperties['fontWeight']
  bold?: boolean
}
const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeigth, bold }) => ({
    color: colors[color],
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeigth,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)
export default Text
