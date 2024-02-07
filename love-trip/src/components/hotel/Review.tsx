import useUser from '@/hooks/auth/useUser'
import { format } from 'date-fns'
import { ChangeEvent, useCallback, useState } from 'react'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import ListRow from '../shared/ListRow'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import TextField from '../shared/TextField'
import useReview from './hooks/useReview'

const Review = ({ hotelId }: { hotelId: string }) => {
  const { data: reviews, isLoading, write, remove } = useReview({ hotelId })
  const [text, setText] = useState<string>('')
  const user = useUser()
  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/message_open-256.png"
            alt=""
          />
          <Spacing size={10} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다 첫 리뷰를 작성해주세요
          </Text>
        </Flex>
      )
    }
    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user.photoURL ? (
                <img src={review.user.photoURL} alt="" />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
            right={
              review.userId === user?.uid ? (
                <Button
                  onClick={() =>
                    remove({ reviewId: review.id, hotelId: review.hotelId })
                  }
                >
                  삭제
                </Button>
              ) : null
            }
          />
        ))}
      </ul>
    )
  }, [reviews, user, remove])
  const handleChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setText(value)
  }, [])
  if (isLoading) return null
  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user ? (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleChangeText} />
          <Spacing size={6} />
          <Flex justify="flex-end">
            <Button
              disabled={!text}
              onClick={async () => {
                const success = await write(text)
                if (success === true) setText('')
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}

export default Review
