import { COLLECTIONS } from '@/constants/collection';
import { Event } from '@/models/event';
import { store } from '@/remote/firebase';
import Button from '@shared/Button';
import Flex from '@shared/Flex';
import Input from '@shared/Input';
import TextField from '@shared/TextField';
import { collection, doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, useCallback, useState } from 'react';
import Preview from '../event/Preview';

const EventForm = () => {
  const [formValues, setFormValues] = useState<Event>({
    title: '',
    subTitle: '',
    contents: '',
    buttonLabel: '',
    link: '',
    endDate: '',
  });
  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );
  const handleSubmit = useCallback(async () => {
    await setDoc(doc(collection(store, COLLECTIONS.EVENT)), formValues);
    alert('이벤트 정보를 추가했습니다');
  }, []);
  const 제출이가능한가 = Object.values(formValues).every(
    (value) => value !== ''
  );
  return (
    <Flex direction="column">
      <Flex>
        <Flex style={{ flex: 1 }} direction="column">
          <TextField
            name="title"
            label="이벤트 제목"
            onChange={handleFormValues}
            value={formValues.title}
          />
          <TextField
            name="subTitle"
            label="이벤트 부제목"
            onChange={handleFormValues}
            value={formValues.subTitle}
          />
          <textarea
            style={{ height: 400 }}
            name="contents"
            onChange={handleFormValues}
            value={formValues.contents}
          />
          <TextField
            name="buttonLabel"
            label="버튼명"
            onChange={handleFormValues}
            value={formValues.buttonLabel}
          />
          <TextField
            name="link"
            label="링크"
            onChange={handleFormValues}
            value={formValues.link}
          />
          <TextField
            name="endDate"
            label="이벤트 종료일"
            onChange={handleFormValues}
            value={formValues.endDate}
          />
        </Flex>
        <Flex style={{ flex: 2 }}>
          <Preview data={formValues} mode="edit" />
        </Flex>
      </Flex>

      <Input />
      <TextField />
      <Button onClick={handleSubmit} disabled={제출이가능한가}>
        저장하기
      </Button>
    </Flex>
  );
};

export default EventForm;
