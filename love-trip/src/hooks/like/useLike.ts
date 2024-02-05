import { useAlertContext } from '@/context/AlertContext'
import { Hotel } from '@/models/hotel'
import { getLikes, toggleLike } from '@/remote/like'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import useUser from '../auth/useUser'

const useLike = () => {
  const client = useQueryClient()
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const { data } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }),
    { enabled: Boolean(user) },
  )
  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'> }) => {
      if (!user) {
        throw new Error('로그인 필요')
      }
      return toggleLike({ hotel, userId: user.uid })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['likes'])
      },
      onError: (e: Error) => {
        if (e.message === '로그인 필요') {
          open({
            title: '로그인이 필요한 기능입니다',
            onButtonClick: () => navigate('/signin'),
          })
          return
        }
        open({
          title: '알 수 없는 에러가 발생하였습니다. 잠시 후 다시 시도해주세요',
          onButtonClick: () => {},
        })
      },
    },
  )
  return { data, mutate }
}

export default useLike
