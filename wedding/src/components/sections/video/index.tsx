import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import Section from '../../shared/section'

const cx = classNames.bind(styles)

const Video = () => {
  return (
    <Section className={cx('container')}>
      <video autoPlay muted loop poster="/assets/poster.jpg">
        <source src="/assets/low.mp4" type="video/mp4" />
        {/* <source src="/assets/low.mp4" type="video/mp4" /> 여기에 webM 넣고 사용하면 됨 */}
      </video>
    </Section>
  )
}

export default Video
