import useUser from '@/hooks/auth/useUser'
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
      return (
        <Link to="/my">
          <img
            src={
              user.photoUrl ??
              'https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/user_account_profile-2-256.png'
            }
            alt="유저 이미지"
            width={40}
            height={40}
            style={{ borderRadius: `100%` }}
          />
        </Link>
      )
    }

    if (showButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showButton])

  return (
    <Flex justify="space-between" align="center" css={navContainerStyles}>
      <Link to="/">Love Trip</Link>
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
