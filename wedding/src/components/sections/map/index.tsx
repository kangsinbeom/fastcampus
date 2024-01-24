import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import Section from '../../shared/section'
import { useEffect, useRef } from 'react'
import { Location } from '../../../models/wedding'

declare global {
  interface Window {
    kakao: any
  }
}
const cx = classNames.bind(styles)

const Map = ({ location }: { location: Location }) => {
  const mapContainer = useRef(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        )
        const option = {
          center: position,
          level: 3,
        }
        const marker = new window.kakao.maps.Marker({
          position,
        })
        const map = new window.kakao.maps.Map(mapContainer.current, option)
        marker.setMap(map)
      })
    }
  }, [location])

  return (
    <Section>
      <div className={cx('wrap-map')}>
        <div className={cx('map')} ref={mapContainer}></div>
        <a
          className={cx('btn-find-way')}
          href={location.link}
          target="_blank"
          rel="noreferrer"
        >
          길 찾기
        </a>
      </div>
    </Section>
  )
}

export default Map
