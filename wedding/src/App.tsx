import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './App.module.scss'
import FullScreenMessage from './components/shared/fullScreenMessage'
import Heading from './components/sections/heading'
import { Wedding } from './models/wedding'
import Video from './components/sections/video'
import ImageGallery from './components/sections/imageGallery'
import Intro from './components/sections/intro'
import Invitaion from './components/sections/invitation'
import Calender from './components/sections/calender'
import Map from './components/sections/map'
import Contact from './components/sections/contact'

const cx = classNames.bind(styles)

function App() {
  const [data, setData] = useState<Wedding | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  // fetching wedding data
  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return res.json()
      })
      .then((data) => {
        setData(data)
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])
  if (isLoading) {
    return <FullScreenMessage type="loading" />
  }

  if (isError) {
    return <FullScreenMessage type="error" />
  }
  if (data === null) {
    return null
  }
  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = data
  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom?.name}
        brideName={bride?.name}
        locataionName={location.name}
        date={date}
        message={intro}
      />
      <Invitaion message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calender date={date} />
      <Map location={location} />
      <Contact />
    </div>
  )
}

export default App
