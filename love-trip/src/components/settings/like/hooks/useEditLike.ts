import { useAlertContext } from '@/context/AlertContext'
import useLike from '@/hooks/like/useLike'
import { Like } from '@/models/like'
import { updateOrder } from '@/remote/like'
import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

const useEditLike = () => {
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { data } = useLike()
  const { open } = useAlertContext()
  const client = useQueryClient()
  useEffect(() => {
    if (data) setUpdatedLikes(data)
  }, [data])
  const reOrder = useCallback((from: number, to: number) => {
    setIsEdit(true)
    setUpdatedLikes((prev) => {
      const newItems = [...prev]
      const [fromItem] = newItems.splice(from, 1)
      if (fromItem) newItems.splice(to, 0, fromItem)
      newItems.forEach((like, index) => {
        like.order = index + 1
      })
      return newItems
    })
  }, [])
  const save = async () => {
    try {
      await updateOrder(updatedLikes)
      client.setQueryData(['likes'], updatedLikes)
      setIsEdit(false)
    } catch (e) {
      open({
        title: '알수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요',
        onButtonClick: () => setUpdatedLikes([]),
      })
      return
    }
  }
  return { data: isEdit ? updatedLikes : data, isEdit, reOrder, save }
}

export default useEditLike
