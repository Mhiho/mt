import { Layout } from '../src/hoc/layout';
import Link from 'next/link';

export default function YouCanLogin() {
  return (
    <Layout>
      Możesz się zalogować{' '}
      <button>
        <Link href="/login">Przejdź do logowania</Link>
      </button>
      , w razie problemów napisz <a href="mailto:m.pelka7@gmail.com">tu</a>
    </Layout>
  );
}
