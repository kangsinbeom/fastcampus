import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import useGoogleSignin from '@/hooks/useGoogleSignin'

const SigninPage = () => {
  const { signin } = useGoogleSignin()
  return (
    <Flex direction="column" align="center" style={{ padding: 24 }}>
      <Spacing size={100} />
      <img
        src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-42-64.png"
        alt=""
        width={120}
        height={120}
      />
      <Spacing size={60} />
      <Button size="medium" onClick={signin}>
        <Flex align="center" justify="center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-64.png"
            alt=""
            width={20}
            height={20}
          />
          <Spacing size={4} direction="horizontal" />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  )
}

export default SigninPage
