import { Optoin, Term } from '@/models/apply'

export const 약관목록 = [
  {
    id: '01',
    title: '카드신청 관련 안내 및 필수 동의',
  },
  {
    id: '02',
    title: '(필수) 개인정보 요약동의서',
    link: 'https://www.google.com',
  },
] as Term[]

export const 연소득옵션 = [
  { label: '600 ~ 5000', value: '600 ~ 5000' },
  { label: '5000 ~ 10000', value: '5000 ~ 10000' },
  { label: '1억 초과', value: '1억 초과' },
] as Optoin[]
export const 신용점수옵션 = [
  { label: '600 이상', value: '600 이상' },
  { label: '600 미만', value: '600 미만' },
] as Optoin[]
export const 결재일옵션 = [
  { label: '1일', value: '1일' },
  { label: '25일', value: '25일' },
] as Optoin[]
