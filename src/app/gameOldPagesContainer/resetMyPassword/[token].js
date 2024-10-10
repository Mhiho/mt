import React, { useState } from 'react';
import { Layout } from '../../src/hoc/layout';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { resetPassword } from '../../src/services/auth';
import { useRouter } from 'next/router';

export default function SendEmailForResetPwd() {
  const router = useRouter();
  const { token } = router.query;
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [succes, setSucces] = useState(false);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const findFormErrors = () => {
    const { password, passwordConfirmation } = form;
    const newErrors = {};
    if (!password || password === '') newErrors.password = 'Wpisz hasło!';
    else if (password.length < 8 || password.length > 50)
      newErrors.password =
        'Hasło musi mieć przynajmniej osiem znaków, nie może też być zbyt długi!';
    if (!passwordConfirmation || passwordConfirmation === '')
      newErrors.passwordConfirmation = 'Potwierdź hasło!';
    else if (passwordConfirmation !== password)
      newErrors.passwordConfirmation = 'hasła się nie zgadzają!';
    else if (passwordConfirmation.length > 50)
      newErrors.passwordConfirmation = 'Hasło potwierdzające jest zbyt długie';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    const { password } = form;
    event.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      const response = await resetPassword(password, token).catch((e) => console.log(e));
      if (response.data === 'password changed') {
        setSucces(true);
      }
    }
  };
  if (succes === true) {
    router.push('/login');
  }
  return (
    <Layout>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setField('password', e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          <Form.Label>Potwierdź hasło</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setField('passwordConfirmation', e.target.value)}
            isInvalid={!!errors.passwordConfirmation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordConfirmation}
          </Form.Control.Feedback>
          <Button type="submit">Resetuj hasło!</Button>
        </Form.Group>
      </Form>
    </Layout>
  );
}
