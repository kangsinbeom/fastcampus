import Image from 'next/image';
import ListRow from '../shared/ListRow';
import { useRouter } from 'next/router';
import withSuspense from '@/hooks/withSuspense';
import useUser from '@/hooks/useUser';
import { useQuery } from 'react-query';
import { getPiggybank } from '@/remote/piggybank';
import { differenceInDays } from 'date-fns';
import Flex from '../shared/Flex';
import Text from '../shared/Text';
import addDelimiter from '@/utils/addDelimiter';

const PiggybankRow = () => {
  const navigate = useRouter();
  const user = useUser();
  const { data } = useQuery(
    ['piggybank', user?.id as string],
    () => getPiggybank(user?.id as string),
    {
      suspense: true,
    }
  );
  if (!data) {
    return (
      <div>
        <ListRow
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
              alt="piggy"
              width={40}
              height={40}
            />
          }
          contents={
            <ListRow.Texts
              title="저금통"
              subTitle="매일 조금씩 모아 목표 금액을 모아보아요"
            />
          }
          withArrow={true}
          onClick={() => navigate.push('/account/piggybank/new')}
        />
      </div>
    );
  }
  const { balance, endDate, goalAmount } = data;
  // 종료일자를 활용해서 d-day를 구할 것임
  const dDay = differenceInDays(endDate, new Date());
  return (
    <div>
      <ListRow
        left={
          <Image
            src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
            alt="piggy"
            width={40}
            height={40}
          />
        }
        contents={
          <Flex direction="column">
            <Text typography="t4" bold={true}>
              D-{dDay}
            </Text>
            <Text>{addDelimiter(goalAmount - balance)}원 남았어요</Text>
          </Flex>
        }
        withArrow={true}
        onClick={() => navigate.push('/account/piggybank/new')}
      />
    </div>
  );
};

export default withSuspense(PiggybankRow, { fallback: <>로딩중</> });
