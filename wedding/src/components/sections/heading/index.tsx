import Section from '../../shared/section'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { format, getDay, parseISO } from 'date-fns'
import { WEEK } from '../../../utils/day'
const cx = classNames.bind(styles)

const Heading = ({ date }: { date: string }) => {
  const weddingDate = parseISO(date)
  const weddingDay = getDay(date)
  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      <div className={cx('txt-day')}>{WEEK[weddingDay]}</div>
    </Section>
  )
}

export default Heading
