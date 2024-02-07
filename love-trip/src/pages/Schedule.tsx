import FixedBottomButton from '@/components/shared/FixedBottomButton'
import RangePicker from '@/components/shared/RangePicker'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState<{
    startDate: string | undefined
    endDate: string | undefined
    nights: number
  }>({ startDate: undefined, endDate: undefined, nights: 0 })
  const navigate = useNavigate()
  const { roomId, hotelId } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { roomId: string; hotelId: string }
  useEffect(() => {
    if (!roomId || !hotelId) window.history.back()
  }, [roomId, hotelId])
  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true },
    )
    navigate(`/reservation/${params}`)
  }
  const 제출가능한가 =
    selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = 제출가능한가
    ? `${selectedDate.endDate} (${selectedDate.nights})박`
    : '예약날짜를 선택해주세요'
  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChagne={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={!제출가능한가}
        onClick={moveToReservationPage}
      />
    </div>
  )
}

export default SchedulePage
