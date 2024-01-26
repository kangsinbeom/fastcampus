import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import Dimmed from '../dimmed'

interface ModalProps {
  open: boolean
  title?: string
  body: React.ReactNode
  rightButtonLabel?: string
  onRightButtonClick: () => void
  leftButtonLabel?: string
  onLeftButtonClick: () => void
}

const cx = classNames.bind(styles)

const Modal = ({ open }: ModalProps) => {
  return (
    <Dimmed>
      <div className={cx('wrap-modal')}>
        <div>
          <div></div>
        </div>
      </div>
    </Dimmed>
  )
}

export default Modal
