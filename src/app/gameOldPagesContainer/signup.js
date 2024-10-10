import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { adresse } from '../config';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
  const router = useRouter();
  const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  const [form, setForm] = useState({});
  const [race, setRace] = useState();
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
    const { name, email, race, password, passwordConfirmation } = form;
    const newErrors = {};
    // username errors
    if (!name || name === '') newErrors.name = 'nazwa użytkownika nie może być pusta!';
    else if (name.length < 2 || name.length > 50)
      newErrors.name =
        'nazwa użytkownika nie może być krótsza niż dwa znaki oraz dłuższa niż 50 znaków!';
    // email errors
    if (!email || email === '') newErrors.email = 'Adres mailowy musi być uzupełniony!';
    else if (!regex.test(email)) newErrors.email = 'Wpisz właściwy adres mailowy!';
    else if (email.length > 50) newErrors.email = 'Adres emailowy jest zbyt długi!';
    if (!password || password === '') newErrors.password = 'Wpisz hasło!';
    else if (password.length < 8 || password.length > 50)
      newErrors.password =
        'Hasło musi mieć przynajmniej osiem znaków, nie może też być zbyt długi!';
    // race error
    if (race < 0 || race > 2 || race === undefined) newErrors.race = 'Kim chcesz zagrać?';
    // confirmation password errors
    if (race === 'Wybierz królestwo, którym chcesz zagrać') newErrors.race = 'Kim chcesz zagrać?';
    if (!passwordConfirmation || passwordConfirmation === '')
      newErrors.passwordConfirmation = 'Potwierdź hasło!';
    else if (passwordConfirmation !== password)
      newErrors.passwordConfirmation = 'hasła się nie zgadzają!';
    else if (passwordConfirmation.length > 50)
      newErrors.passwordConfirmation = 'Hasło potwierdzające jest zbyt długie';
    return newErrors;
  };

  const handleSubmit = (event) => {
    const { name, email, race, password } = form;
    event.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      const headers = { 'Content-Type': 'application/json' };
      const data = {
        email,
        name,
        race,
        password,
      };
      console.log(data);
      axios
        .post(`${adresse}/users/register`, data, { headers: headers })
        .then((response) => setSucces(true))
        .catch((error) => new Error(error));
    }
  };
  if (succes === true) {
    router.push('/checkMail');
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Label>Nazwa użytkownika</Form.Label>
        <Form.Control
          name="name"
          type="text"
          onChange={(e) => setField('name', e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        <Form.Label>Adres mailowy</Form.Label>
        <Form.Control
          name="email"
          type="text"
          onChange={(e) => setField('email', e.target.value)}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        <Form.Label>Rasa</Form.Label>
        <select
          name="race"
          onChange={(e) => setField('race', e.target.value)}
          aria-label="Default select example"
          value={race}
        >
          <option>Wybierz królestwo, którym chcesz zagrać</option>
          <option value="0">Loris</option>
          <option value="1">Ibis</option>
          <option value="2">Horda</option>
        </select>
        {!!errors.race ? <Alert variant="danger">{errors.race}</Alert> : null}
        <hr></hr>
        <Form.Label>Hasło</Form.Label>
        <Form.Control
          name="password"
          type="password"
          onChange={(e) => setField('password', e.target.value)}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        <Form.Label>Potwierdź hasło</Form.Label>
        <Form.Control
          name="passwordConf"
          type="password"
          onChange={(e) => setField('passwordConfirmation', e.target.value)}
          isInvalid={!!errors.passwordConfirmation}
        />
        <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Zarejestruj!</Button>
    </Form>
  );
};
export default SignUp;
