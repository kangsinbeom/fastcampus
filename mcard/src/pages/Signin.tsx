import Form from '@/components/signin/Form'
import { useAlertContext } from '@/contexts/AlertContext'
import { SigninValue } from '@/models/signin'
import { auth } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const SigninPage = () => {
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const handleSubmit = useCallback(
    async (form: SigninValue) => {
      const { email, password } = form
      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (e) {
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {},
            })
            return
          }
          open({
            title: '잠시 후 다시 시도해주세요',
            onButtonClick: () => {},
          })
        }
      }
    },
    [navigate, open],
  )
  return (
    <div>
      <Form handleSubmit={handleSubmit} />
    </div>
  )
}

export default SigninPage
