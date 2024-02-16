import withAuth from '@/hooks/withAuth';
import dynamic from 'next/dynamic';

const MonthlyChart = dynamic(() => import('@/components/account/MonthlyChart'));
const Transactions = dynamic(() => import('@/components/account/Transactions'));

const AccountPage = () => {
  return (
    <div>
      <MonthlyChart chartData={[]} />
      <Transactions />
    </div>
  );
};

function generateMonthlyChartData() {
  return [
    '2023-01-31',
    '2023-02-28',
    '2023-03-31',
    '2023-04-30',
    '2023-05-31',
    '2023-06-30',
    '2023-07-31',
    '2023-08-31',
    '2023-09-30',
  ].map((date) => ({
    date,
    balance: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
  }));
}

export default withAuth(AccountPage);
