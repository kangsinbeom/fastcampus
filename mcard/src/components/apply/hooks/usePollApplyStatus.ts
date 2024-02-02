import { APPLY_STATUS } from '@/models/apply'
import { useQuery } from 'react-query'

interface usePollApplyStatusProps {
  onSuccess: () => void
  onError: () => void
  enabled: boolean
}

const usePollApplyStatus = ({
  onError,
  onSuccess,
  enabled,
}: usePollApplyStatusProps) => {
  return useQuery(['apllyStatus'], () => {}, {
    enabled,
    refetchInterval: 2_000,
    staleTime: 0,
    onSuccess: (status: string) => {
      if (status === APPLY_STATUS.COMPLETE) {
        onSuccess()
      }
    },
    onError: () => {
      onError()
    },
  })
}

export default usePollApplyStatus
