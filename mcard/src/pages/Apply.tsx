import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import useUser from '@/hooks/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { upadteApplyCard } from '@/remote/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ApplyPage = () => {
  const navigate = useNavigate()
  const [readyPoll, setReadyPoll] = useState<boolean>(false)
  const user = useUser()
  const { id } = useParams() as { id: string }
  usePollApplyStatus({
    onSuccess: () => {
      upadteApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: () => {
      upadteApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyPoll,
  })

  const { mutate, isLoading: 카드를신청중 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (readyPoll || 카드를신청중) {
    return <div>로딩중</div>
  }
  return <Apply onSubmit={mutate} />
}

export default ApplyPage
