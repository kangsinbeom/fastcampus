import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { PropsWithChildren, useState } from 'react'
const cx = classNames.bind(styles)

interface AccordionProps {
  label: string
}

const Accodion = ({ label, children }: PropsWithChildren<AccordionProps>) => {
  const [expended, setExpended] = useState<boolean>(false)
  return (
    <div className={cx(['wrap-accodion', expended ? 'open' : ''])}>
      <div>
        <span>{label}</span>
        <button>icon</button>
      </div>
      <div className={cx('wrap-content')}>{children}</div>
    </div>
  )
}

export default Accodion
