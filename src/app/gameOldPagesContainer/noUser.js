import { Layout } from '../src/hoc/layout';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

const noUser = () => {
  return (
    <Layout>
      <h1>Nie ma takiego użytkownika.</h1>
      <Button>
        <Link href="/login">Powrót do logowania</Link>
      </Button>
    </Layout>
  );
};

export default noUser;
