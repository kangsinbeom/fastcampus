import Flex from '@/components/shared/Flex';
import Spacing from '@/components/shared/Spacing';
import Text from '@/components/shared/Text';
import CardListAddButton from '@/components/test/CardListAddButton';
import EventAddBannerButton from '@/components/test/EventAddBannerButton';
import EventForm from '@/components/test/EventForm';
import TransactionForm from '@/components/test/TransactionForm';

const TestPage = () => {
  return (
    <Flex direction="column">
      <Text>배너</Text>
      <EventAddBannerButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Text bold={true}>카드</Text>
      <CardListAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <EventForm />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Text bold={true}>입출금 테스트</Text>
      <TransactionForm />
    </Flex>
  );
};

export default TestPage;
