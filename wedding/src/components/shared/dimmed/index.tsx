import styles from './styles.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Dimmed = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx('dimmed')}>{children}</div>
}

export default Dimmed
