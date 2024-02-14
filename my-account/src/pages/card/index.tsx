import Badge from '@/components/shared/Badge';
import Input from '@/components/shared/Input';
import ListRow from '@/components/shared/ListRow';
import Top from '@/components/shared/Top';
import { getCards } from '@/remote/card';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query';

const CardListPage = () => {
  const navigate = useRouter();
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible;
    },
  });
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);
  if (!data) return null;
  const cards = data?.pages.map(({ items }) => items).flat();
  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input onFocus={() => navigate.push('/card/search')} />
      </div>
      <InfiniteScroll
        dataLength={cards?.length}
        hasMore={hasNextPage}
        loader={<div>로딩중</div>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback && <Badge label={card.payback} />}
              withArrow={true}
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export function getServerSideProps() {
  console.log('getServerSideProps');
  const client = new QueryClient();
  client.prefetchInfiniteQuery(['cards'], () => getCards());
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  };
}

export default CardListPage;
