import { auth } from '@/remote/firebase'
import { userAtom } from '@/store/atom/user'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [initialize, setInitialize] = useState<boolean>(false)
  const setUser = useSetRecoilState(userAtom)
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setUser(null)
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoUrl: user.photoURL ?? '',
      })
    }
    setInitialize(true)
  })

  if (!initialize) return null
  return <>{children}</>
}

export default AuthGuard
