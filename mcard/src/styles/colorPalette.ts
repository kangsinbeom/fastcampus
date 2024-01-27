import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --gray: #9e9e9e;
  }
`

export const colors = {
  red: 'val(--red)',
  blue: 'val(--blue)',
  green: 'val(--green)',
  white: 'val(--white)',
  black: 'val(--black)',
  gray: 'val(--gray)',
}

export type Color = keyof typeof colors
