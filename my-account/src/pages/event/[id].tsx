import Preview from '@/components/event/Preview';
import { useAlertContext } from '@/contexts/AlertContext';
import { Event } from '@/models/event';
import { getEvent } from '@/remote/event';
import { isAfter, parseISO } from 'date-fns';
import { GetServerSidePropsContext } from 'next';
import { useQuery } from 'react-query';

interface EventPageProps {
  initialEnvent: Event;
  id: string;
}

const EventPage = ({ initialEnvent, id }: EventPageProps) => {
  const { open } = useAlertContext();
  const { data } = useQuery(['event', id], () => getEvent(id as string), {
    initialData: initialEnvent,
    onSuccess: (event) => {
      const 이벤트가종료되었는가 = isAfter(new Date(), parseISO(event.endDate));
      if (이벤트가종료되었는가) {
        open({
          title: `${event.title} 이벤트가 종료되었습니다`,
          description: '다음에 더 좋은 이벤트로 찾아뵙겠습니다',
          onButtonClick: () => {
            window.history.back();
          },
        });
      }
    },
  });
  if (!data) return null;
  return <Preview data={initialEnvent} mode="preview" />;
};

export default EventPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const event = await getEvent(id as string);
  return {
    props: {
      id,
      initialEvnet: event,
    },
  };
}
