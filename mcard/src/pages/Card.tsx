import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { getCard } from '@/remote/card'
import { css } from '@emotion/react'
import React, { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useUser from '@/hooks/useUser'
import { useAlertContext } from '@/contexts/AlertContext'
const CardPage = () => {
  const { id = '' } = useParams()
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    if (!user) {
      open({
        title: '로그인이 필요한 서비스입니다',
        onButtonClick: () => {
          navigate('/signin')
        },
      })
      return
    }
    navigate(`/apply/${id}`)
  }, [id, navigate, open, user])

  if (!data) {
    return null
  }
  const { name, corpName, promotion, tags, benefit } = data
  const subTitle = promotion ? removeHtmlTags(promotion.title) : tags.join(', ')
  return (
    <div>
      <Top title={`${name} ${corpName}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{ opacity: 0, translateX: -90 }}
              // whileInView={{ opacity: 1 }} 애니메이션이랑 둘 중 하나만 쓰는 거임
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              animate={{ opacity: 1, translateX: 0 }}
            >
              <ListRow
                as="div"
                key={text}
                left={<div>아이콘</div>}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>
      {promotion ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`

function removeHtmlTags(text: string) {
  let output = ''
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

export default CardPage
