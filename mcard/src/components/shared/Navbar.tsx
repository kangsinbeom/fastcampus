import useUser from '@/hooks/useUser'
import { auth } from '@/remote/firebase'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { signOut } from 'firebase/auth'
import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'

const Navbar = () => {
  const location = useLocation()
  const user = useUser()
  const showButton = ['/signup', '/signin'].includes(location.pathname)
  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])
  const renderButton = useCallback(() => {
    if (user) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }
    if (!showButton) {
      return (
        <Link to="/signup">
          <Button>회원가입 / 로그인</Button>
        </Link>
      )
    }
    return null
  }, [user, showButton, handleLogout])

  return (
    <Flex justify="space-between" align="center" css={navContainerStyles}>
      <Link to="/">HOME</Link>
      {renderButton()}
    </Flex>
  )
}
const navContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray};
`

export default Navbar
