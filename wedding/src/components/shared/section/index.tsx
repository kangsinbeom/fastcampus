import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)
interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
}

const Section = ({ children, className, title }: SectionProps) => {
  return (
    <section className={cx('container', className)}>
      {title != null ? <div className={cx('txt-title')}>{title}</div> : null}
      {children}
    </section>
  )
}

export default Section
