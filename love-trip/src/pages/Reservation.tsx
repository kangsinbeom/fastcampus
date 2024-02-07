import Form from '@/components/reservation/Form'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'
import useUser from '@/hooks/auth/useUser'
import addDelimiter from '@/utils/addDelimiter'
import { parse } from 'qs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ReservationPage = () => {
  const user = useUser()
  const navigate = useNavigate()
  const { startDate, endDate, nigths, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  ) as {
    startDate: string
    endDate: string
    nigths: string
    roomId: string
    hotelId: string
  }
  useEffect(() => {
    if (
      [user, startDate, endDate, nigths, roomId, hotelId].some(
        (param) => param == null,
      )
    )
      window.history.back()
  }, [startDate, endDate, nigths, roomId, hotelId, user])

  const { data, isLoading, makeReservation } = useReservation({
    hotelId,
    roomId,
  })
  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nigths),
      formValues,
    }
    await makeReservation(newReservation)
    navigate(`/reservation/done?hotelName=${hotel.name}`)
  }

  if (data == null || isLoading) {
    return null
  }
  // 이부분에서 Undefined가 왜 나오는거지??
  const { hotel, room } = data

  const buttonLabel = `${nigths}박 ${addDelimiter(room.price * Number(nigths))}원 예약하기`
  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nigths}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        onSubmit={handleSubmit}
        forms={hotel.forms}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
