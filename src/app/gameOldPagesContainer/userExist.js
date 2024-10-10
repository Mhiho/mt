import { Layout } from '../src/hoc/layout';

export default function userExist() {
  return (
    <Layout>
      Użytkownik jest już aktywny, możesz się zalogować, w razie problemów napisz{' '}
      <a href="mailto:m.pelka7@gmail.com">tu</a>
    </Layout>
  );
}
