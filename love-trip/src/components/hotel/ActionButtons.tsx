import Flex from '@shared/Flex'
import useShare from '@/hooks/useShare'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { Hotel } from '@/models/hotel'
import { css } from '@emotion/react'
import CopyToClipboard from 'react-copy-to-clipboard'
import useLike from '@/hooks/like/useLike'

const ActionButtons = ({ hotel }: { hotel: Hotel }) => {
  const { data: likes, mutate: like } = useLike()
  const share = useShare()
  const { name, comment, mainImageUrl, id } = hotel
  // 캐시된 데이터의 싱크를 맞춰서 캐싱된 데이터를 사용하기 위해서 이런식으로 사용하는 것임 그냥 하나만 가져와도 되지만 이게 더 효율적일지도
  const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id))
  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        onClick={() => {
          like({
            hotel: {
              name,
              id,
              mainImageUrl,
            },
          })
        }}
        iconUrl={
          isLike
            ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
            : 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-256.png'
        }
      />
      <Button
        label="공유하기"
        onClick={() =>
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: 'Love Trip에서 보기',
          })
        }
        iconUrl="https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png"
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => alert('링크가 복사되었습니다')}
      >
        <Button
          label="링크복사"
          iconUrl="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/paste-clipboard-copy-512.png"
        />
      </CopyToClipboard>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;
  & * {
    flex: 1;
  }
`

export default ActionButtons

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string
  iconUrl: string
  onClick?: () => void
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt="" width={30} height={30} />
      <Spacing size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}
