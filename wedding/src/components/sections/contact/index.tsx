import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import Section from '../../shared/section'
import Accodion from '../../shared/accordion'
import { Person } from '../../../models/wedding'
import CopyToClipboard from 'react-copy-to-clipboard'

const cx = classNames.bind(styles)

const Contact = () => {
  return (
    <Section>
      <Accodion label="신랑측">asdf</Accodion>
      <Accodion label="신부측">ㅇㅇㅇㅇ</Accodion>
    </Section>
  )
}
function ContactInfo({ name, account, phoneNumber }: Person) {
  return (
    <div>
      <div>
        <span>{`${account.bankName} | ${account.accountNumber}`}</span>
        <span>{name}</span>
      </div>
      <ul>
        <li>전화 {phoneNumber}</li>
        <li>
          <CopyToClipboard
            text={`${account.bankName} ${account.accountNumber}`}
            onCopy={() => {
              alert('complete copy')
            }}
          >
            <button>복사</button>
          </CopyToClipboard>
        </li>
        <li>송금</li>
      </ul>
    </div>
  )
}

export default Contact
