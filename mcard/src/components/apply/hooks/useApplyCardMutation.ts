import { useAlertContext } from '@/contexts/AlertContext'
import { ApplyValues } from '@/models/apply'
import { applyCard } from '@/remote/apply'
import { useMutation } from 'react-query'

interface useApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

const useApplyCardMutation = ({
  onSuccess,
  onError,
}: useApplyCardMutationProps) => {
  const { open } = useAlertContext()
  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      open({
        title: '카드를 신청하지 못했으니 다시 시도해주세요 나중에',
        onButtonClick: () => onError(),
      })
    },
  })
}

export default useApplyCardMutation
