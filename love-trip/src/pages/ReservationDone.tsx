import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
const ReservationDonePage = () => {
  const navigate = useNavigate()
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName: string
  }

  return (
    <div>
      <Spacing size={80} />
      <Flex direction="column">
        <img
          src="https://cdn1.iconfinder.com/data/icons/travel-line-good-life/512/plane-256.png"
          alt=""
          width={120}
          height={120}
        />
        <Text typography="t4" bold={true}>
          {hotelName}
        </Text>
        <Spacing size={8} />
        <Text>예약이 완료되었습니다</Text>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: 24 }}>
        <Button.Group>
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/reservation/list')}>
            예약리스트로
          </Button>
        </Button.Group>
      </div>
    </div>
  )
}
export default ReservationDonePage
