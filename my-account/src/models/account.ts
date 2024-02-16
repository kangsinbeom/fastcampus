export interface Term {
  id: string;
  link: string;
  title: string;
  mandatory: boolean;
}

export interface BaseForm {
  id: string;
  label: string;
  required: boolean;
  helpMessage?: string;
}

interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD';
}
interface SelectFieldForm extends BaseForm {
  type: 'SELECT';
  option: Array<{ label: string; value: string }>;
}
export type AccountForm = TextFieldForm | SelectFieldForm;

type AccountStatus = 'READY' | 'DONE';

export interface Account {
  accountName: string;
  accountNumber: number;
  balance: number;
  email: string;
  name: string;
  phone: string;
  status: AccountStatus;
  userId: string;
}
