import { Layout } from '../src/hoc/layout';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

const resetMyPassword = () => {
  return (
    <Layout>
      <h1>Sprawdź skrzynkę pocztową.</h1>
      <Button>
        <Link href="/login">Powrót do logowania</Link>
      </Button>
    </Layout>
  );
};

export default resetMyPassword;
