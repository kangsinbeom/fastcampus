import { getAdBanners } from '@/remote/card'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Flex from '@shared/Flex'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import Text from '../shared/Text'

import 'swiper/css'
const AdBanners = () => {
  const { data } = useQuery('adBanners', () => getAdBanners())
  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner, index) => {
          return (
            <SwiperSlide key={index}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyle}>
                  <Text bold={true}>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyle = css`
  padding: 16px;
  background-color: ${colors.gray};
`

export default AdBanners
