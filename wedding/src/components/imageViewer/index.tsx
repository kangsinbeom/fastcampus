import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { Swiper, SwiperSlide } from 'swiper/react'

import './swiper.css'

const cx = classNames.bind(styles)

interface ImageViewerProps {
  images: string[]
  open: boolean
}

const ImageViewer = ({ images, open = false }: ImageViewerProps) => {
  if (open === false) {
    return null
  }

  return (
    <div className={cx('dimmed')}>
      <Swiper spaceBetween={20} slidesPerView={1} loop={true} initialSlide={0}>
        {images.map((src, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={src} alt="이미지 뷰어" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default ImageViewer
