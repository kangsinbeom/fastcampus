import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import Section from '../../shared/section'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'
const cx = classNames.bind(styles)

const css = `
  .rdp-caption {
    display: none;
  }
  .rdp-cell {
    cursor: default;
  }
`

const Calender = ({ date }: { date: string }) => {
  const weddingDate = parseISO(date)
  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div className={cx('wrap-calender')}>
        <style>{css}</style>
        <DayPicker
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  )
}

export default Calender
