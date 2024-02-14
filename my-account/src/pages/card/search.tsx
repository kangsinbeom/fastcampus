import Badge from '@/components/shared/Badge';
import Input from '@/components/shared/Input';
import ListRow from '@/components/shared/ListRow';
import Text from '@/components/shared/Text';
import Top from '@/components/shared/Top';
import useDebounce from '@/hooks/useDebounce';
import { getSearchCards } from '@/remote/card';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

const SearchPage = () => {
  const navigate = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword);
  const { data } = useQuery(
    ['cards', keyword],
    () => getSearchCards(debouncedKeyword),
    {
      enabled: !!keyword,
    }
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input ref={inputRef} onChange={handleKeyword} value={keyword} />
      </div>
      {keyword && data?.length === 0 ? (
        <div style={{ padding: 24 }}>
          <Text>찾으시는 카드가 없습니다</Text>
        </div>
      ) : (
        <ul>
          {data?.map((card, index) => (
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
      )}
    </div>
  );
};

export default SearchPage;
