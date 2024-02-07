import ActionButtons from '@/components/hotel/ActionButtons'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'
import useHotel from '@/components/hotel/hooks/useHotel'
import Map from '@/components/hotel/Map'
import RecommendHotels from '@/components/hotel/RecommendHotels'
import Review from '@/components/hotel/Review'
import Rooms from '@/components/hotel/Rooms'
import ScrollProgressBar from '@/components/shared/ScrollProgressBar'
import Top from '@/components/shared/Top'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'

const HotelPage = () => {
  const { id } = useParams() as { id: string }
  const { data, isLoading } = useHotel({ id })
  if (!data || isLoading) return <div>Loading...</div>
  const { name, comment, images, contents, location, recommendHotels } = data
  return (
    <div>
      <ScrollProgressBar style={scrollProgressBarStyles} />
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <ActionButtons hotel={data} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels recommendHotels={recommendHotels} />
      <Review hotelId={id} />
    </div>
  )
}

const scrollProgressBarStyles = css`
  position: sticky;
  top: 64px;
  z-index: 2;
`

export default HotelPage
