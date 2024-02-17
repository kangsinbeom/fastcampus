import Button from '@/components/shared/Button';
import Flex from '@/components/shared/Flex';
import Spacing from '@/components/shared/Spacing';
import Text from '@/components/shared/Text';
import { NextPageContext } from 'next';
import Image from 'next/image';

function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div>
      <Spacing size={100} />
      <Flex align="center" direction="column">
        <Image
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-64.png"
          height={80}
          width={80}
          alt=""
        />
        <Spacing size={20} />
        <Text>에러발생 </Text>
        <Spacing size={20} />
        <Button onClick={() => window.history.back()}>돌아가기</Button>
      </Flex>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
