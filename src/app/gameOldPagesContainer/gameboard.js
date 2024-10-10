import privateRoute from '../src/hoc/privateRoute';
import { Layout } from '../src/hoc/layout';
import Link from 'next/link';

const Gameboard = () => {
  return (
    <div>
      <Layout>
        <div>Witaj!</div>
        <Link href="/village">Do stolicy</Link>
      </Layout>
    </div>
  );
};

export default privateRoute(Gameboard, { pathAfterFailure: '/login' });
