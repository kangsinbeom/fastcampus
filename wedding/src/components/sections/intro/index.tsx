import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import Section from '../../shared/section'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import Text from '../../shared/text'
const cx = classNames.bind(styles)
interface IntroProps {
  groomName: string
  brideName: string
  locataionName: string
  date: string
  message: string
}
const Intro = ({
  groomName,
  brideName,
  locataionName,
  date,
  message,
}: IntroProps) => {
  return (
    <Section className={cx('container')}>
      <div className={cx('wrap-people')}>
        <span>{groomName}</span>

        <span>{brideName}</span>
      </div>
      <div className={cx('wrap-location')}>
        <span>
          {format(parseISO(date), 'yyyy년 M월 d일 eeee', { locale: ko })}
        </span>
        <span>{locataionName}</span>
      </div>
      <Text>{message}</Text>
    </Section>
  )
}

export default Intro
