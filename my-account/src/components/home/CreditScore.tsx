import CreditScoreChart from '@shared/CreditScoreChart';
import Flex from '@shared/Flex';
import Text from '@shared/Text';
import Button from '@shared/Button';
import Spacing from '@shared/Spacing';
import Skeleton from '@shared/Skeleton';
import Link from 'next/link';
import useCredit from '../credit/hooks/useCredit';

const CreditScore = () => {
  const { data, isLoading } = useCredit();
  if (isLoading) return <CreditScoreSkeleton />;
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text bold={true}>
            나의 신용도를 증명하고 <br />
            점수를 올리세요
          </Text>
          <Spacing size={8} />
          <Link href="/credit">
            <Button>내 신용점수 보러가기</Button>
          </Link>
        </Flex>
        <CreditScoreChart
          score={data?.creditScore ?? 0}
          width={80}
          height={80}
        />
      </Flex>
    </div>
  );
};

export const CreditScoreSkeleton = () => {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Skeleton width={155} height={50} />
          <Spacing size={8} />
          <Skeleton width={155} height={50} />
        </Flex>
      </Flex>
    </div>
  );
};

export default CreditScore;
