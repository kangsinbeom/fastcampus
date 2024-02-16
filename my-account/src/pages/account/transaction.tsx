import useTransactions from '@/components/account/hooks/useTransactions';
import Flex from '@/components/shared/Flex';
import ListRow from '@/components/shared/ListRow';
import Text from '@/components/shared/Text';
import withAuth from '@/hooks/withAuth';
import { TransactionFilterType } from '@/models/transaction';
import { User } from '@/models/user';
import { getTransactions } from '@/remote/transaction';
import addDelimiter from '@/utils/addDelimiter';
import { format, parseISO } from 'date-fns';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { QueryClient, dehydrate } from 'react-query';

const FILTERS: Array<{ label: string; value: TransactionFilterType }> = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입금',
    value: 'deposit',
  },
  {
    label: '출금',
    value: 'withdraw',
  },
];

const TransactionPage = () => {
  const [currentFilter, setCurrentFilter] =
    useState<TransactionFilterType>('all');
  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useTransactions({ filter: currentFilter });
  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const transactions = data?.pages.map(({ items }) => items).flat() ?? [];

  return (
    <div>
      <Flex as="ul" justify="flex-end" style={{ padding: 24 }}>
        {FILTERS.map((filter) => (
          <li key={filter.value} onClick={() => setCurrentFilter(filter.value)}>
            {filter.label}
          </li>
        ))}
      </Flex>
      <InfiniteScroll
        dataLength={transactions.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        <ul>
          {transactions?.map((transaction) => {
            const 입금인가 = transaction.type === 'deposit';
            return (
              <ListRow
                key={transaction.id}
                contents={
                  <ListRow.Texts
                    title={transaction.displayText}
                    subTitle={format(
                      parseISO(transaction.date),
                      'yyyy-MM-dd HH:mm:SS'
                    )}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <Text color={입금인가 ? 'blue' : 'red'} bold={true}>
                      {입금인가 ? '+' : '-'} {addDelimiter(transaction.amount)}
                      원
                    </Text>
                    <Text>{addDelimiter(transaction.balance)}원</Text>
                  </Flex>
                }
              />
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

// 첫번째 불러올 때에는 페이지를 받이 않아도 상관이 없다. 그러니 sessoin의 유저 정보만 넘겨줘도 된다
async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session && session.user) {
    const client = new QueryClient();
    await client.prefetchInfiniteQuery(
      ['transaction', (session.user as User).id, 'all'],
      () => getTransactions({ userId: (session.user as User).id as string })
    );
    return {
      props: {
        dehydrateState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    };
  }
  return {
    props: {},
  };
}

export default withAuth(TransactionPage);
