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
import useWedding from './hooks/useWedding'

const cx = classNames.bind(styles)

function App() {
  const { data } = useWedding()

  if (data == null) {
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
