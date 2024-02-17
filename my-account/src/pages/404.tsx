import Button from '@/components/shared/Button';
import Flex from '@/components/shared/Flex';
import Spacing from '@/components/shared/Spacing';
import Text from '@/components/shared/Text';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div>
      <Spacing size={100} />
      <Flex align="center" direction="column">
        <Image
          src="https://cdn3.iconfinder.com/data/icons/computing-technology/74/Computer_error_404-RAD-256.png"
          height={80}
          width={80}
          alt=""
        />
        <Spacing size={20} />
        <Text>찾는 페이지 없음</Text>
        <Spacing size={20} />
        <Button onClick={() => window.history.back()}>돌아가기</Button>
      </Flex>
    </div>
  );
};

export default NotFoundPage;
