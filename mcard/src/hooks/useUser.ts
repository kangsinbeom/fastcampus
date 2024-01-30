import { userAtoms } from '@/atoms/user'
import { useRecoilValue } from 'recoil'

const useUser = () => {
  return useRecoilValue(userAtoms)
}

export default useUser
