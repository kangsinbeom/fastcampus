import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { useState } from 'react'
import Button from '../shared/Button'
import useRecommendHotels from './hooks/useRecommendHotels'

const RecommendHotels = ({
  recommendHotels,
}: {
  recommendHotels: string[]
}) => {
  const { data, isLoading } = useRecommendHotels({ hotelIds: recommendHotels })
  const [showMore, setShowMore] = useState<boolean>(false)
  if (isLoading || !data) return null
  const 호텔리스트 = data.length < 3 || showMore ? data : data.slice(0, 3)
  return (
    <div style={{ margin: '24px 0' }}>
      <Text typography="t4" bold={true} style={{ padding: '0 24px' }}>
        추천호텔
      </Text>
      <Spacing size={16} />
      <ul>
        {호텔리스트.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={<img src={hotel.mainImageUrl} alt="" css={imageStyle} />}
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${addDelimiter(hotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {data.length > 3 && showMore === false ? (
        <div style={{ padding: '0 24px', marginTop: 16 }}>
          <Button full={true} weak={true} onClick={() => setShowMore(true)}>
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}
const imageStyle = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default RecommendHotels
