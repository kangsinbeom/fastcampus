import { colors, Colors } from '@/styles/colorPalette'
import { SerializedStyles } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

const ScrollProgressBar = ({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) => {
  const [progress, setProgress] = useState<number>(0)
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    const scroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const heigth =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setProgress(scrollTop / heigth)
      })
    }
    window.addEventListener('scroll', scroll)
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scroll)
    }
  }, [])
  return (
    <div
      css={style}
      style={{
        backgroundColor: colors[color],
        height: 8,
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
      }}
    ></div>
  )
}

export default ScrollProgressBar
