import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import Section from '../../shared/section'

const cx = classNames.bind(styles)

const Video = () => {
  return (
    <Section className={cx('container')}>
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        poster="/assets/poster.jpg"
      >
        <source src="/assets/low.mp4" type="video/mp4" />
      </video>
    </Section>
  )
}

export default Video
