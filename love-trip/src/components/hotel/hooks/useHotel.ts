import { getHotel } from '@/remote/hotel'
import { useQuery } from 'react-query'

const useHotel = ({ id }: { id: string }) => {
  return useQuery(['hotel', id], () => getHotel(id))
}

export default useHotel
