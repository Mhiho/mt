import React, { useState } from 'react';
import { Layout } from '../src/hoc/layout';
import { sendMeResetPasswordEmail } from '../src/services/auth';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email !== '') {
      sendMeResetPasswordEmail(email)
        .then((response) => {
          if (response.data === 'not done') {
            router.push('/noUser');
          }
          if (response.data === 'done') {
            router.push('/checkMail');
          }
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <Layout>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <div>
          <input type="submit" value="Rozpocznij reset hasła" />
        </div>
      </form>
    </Layout>
  );
}
