import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import Section from '../../shared/section'
import Text from '../../shared/text'

const cx = classNames.bind(styles)

const Invitaion = ({ message }: { message: string }) => {
  return (
    <Section className={cx('container')}>
      <Text>{message}</Text>
    </Section>
  )
}

export default Invitaion
