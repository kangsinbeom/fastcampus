import { css } from '@emotion/react';
import Button from './Button';
import Flex from './Flex';
import { colors } from '@/styles/colorPalette';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const showSignButton = ['/auth/signin'].includes(router.pathname) === false;
  const renderButton = useCallback(() => {
    if (session) {
      return (
        <Link href="/my">
          <Image
            width={40}
            height={40}
            alt="유저 이미지"
            src={session.user?.image ?? ''}
          />
        </Link>
      );
    }
    if (showSignButton) {
      return (
        <Link href="/auth/signin">
          <Button>로그인 / 회원가입</Button>
        </Link>
      );
    }
  }, [session, showSignButton]);
  return (
    <Flex justify="space-between" align="center">
      <Link href="/">MyAccont</Link>
      {renderButton()}
    </Flex>
  );
};

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray100};
`;

export default Navbar;
