import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  parseISO,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import { DateRange, DayPicker } from 'react-day-picker'

interface RangePickerProps {
  startDate?: string
  endDate?: string
  onChagne: (dateRange: { from?: string; to?: string; nights: number }) => void
}

const RangePicker = ({ startDate, endDate, onChagne }: RangePickerProps) => {
  const today = new Date()
  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (!dateRange) return
    // 중복된 날짜
    const { from, to } = dateRange
    if (from && to && isSameDay(from, to)) return

    onChagne({
      from: from ? format(from, 'yyyy-MM-dd') : undefined,
      to: to ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    })
  }
  const selected = {
    from: startDate ? parseISO(startDate) : undefined,
    to: endDate ? parseISO(endDate) : undefined,
  }
  return (
    <Container>
      <DayPicker
        mode="range"
        numberOfMonths={5}
        locale={ko}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
        disabled={{ before: addDays(new Date(), 1) }}
      />
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 80px;
  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 60px 0px 30px;
  }

  .rdp-caption {
    position: absolute;
    left: 20px;
    top: 25px;
    color: ${colors.black};
    font-weight: bold;
  }
  .rdp-nav {
    display: none;
  }
  .rdp-table {
    width: 100%;
  }
  .rdp-head .rdp-head_row {
    font-size: 12px;
    height: 45px;
    color: ${colors.gray400};
    font-weight: bold;
  }
  .rdp-tbody .rdp-row {
    height: 45px;
  }
  .rdp-cell .rdp-button {
    position: relative;
    width: 100%;
    line-height: 45px;
  }
  .rdp-cell .rdp-button[disabled] {
    color: ${colors.gray200};
  }

  .rdp-day_selected {
    background-color: ${colors.blue100};
  }

  .rdp-cell .rdp-day_range_start,
  .rdp-cell .rdp-day_range_end {
    color: ${colors.white};
  }
  .rdp-cell .rdp-day_range_start::after,
  .rdp-cell .rdp-day_range_end::after {
    z-index: -1;
    display: block;
    width: calc(100% - 1px);
    height: 45px;
    position: absolute;
    top: 50%;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.blue};
    content: '';
  }
`

export default RangePicker
