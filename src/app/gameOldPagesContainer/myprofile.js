import privateRoute from '../src/hoc/privateRoute';
import { Layout } from '../src/hoc/layout';
import { useState, useContext, useEffect, memo } from 'react';
import { getUser, getAvatar, setUserAvatar, removeAvatar } from '../src/services/auth';
import { Form, Button, Alert } from 'react-bootstrap';
import fighter from '../src/assets/img/fighter.jpg';
import Image from 'next/image';
import test from '../styles/test.module.scss';
import { adresse } from '../config';
import { postPhoto } from '../src/services/methods';
import axios from 'axios';
import ProfileImage from '../src/_components/profile/ProfileImage';
import { ThemeContext } from '../src/context/state';

const Myprofile = () => {
  const user = getUser();
  const userAvatar = getAvatar();
  const [form, setForm] = useState(null);
  const [file, setFile] = useState('file');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(userAvatar);
  const [hidden, setHidden] = useState({
    hidden: true,
    name: 'name',
    type: 'text',
    value: user.details.name,
  });
  const { setCtxUserAvatar } = useContext(ThemeContext);
  const [sent, setSent] = useState(false);
  // console.log(avatar)
  const postPhoto =
    (event) => (rootAdresse, restAdresse, user, imageName, file, textName, func) => {
      event.preventDefault();
      const url = `${rootAdresse}${restAdresse}`;
      const headers = {
        'content-type': 'formData',
        Authorization: 'Bearer ' + `${user.token}`,
      };
      const time = Date.now();
      let data = new FormData(event.target);
      data.append(imageName, file.fieldname);
      data.set('time', time);
      data.set('name', textName);
      axios
        .post(url, data, {
          headers: headers,
        })
        .then((res) => {
          console.log(res.data);
          setAvatar(res.data);
          setUserAvatar(res.data);
          setCtxUserAvatar(res.data);
        })
        .catch((error) => console.log(error));
      setSent(true);
    };

  const handleImageChange = (e) => {
    e.preventDefault();
    setSent(false);
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const fetchImage = async () => {
    return await axios
      .get(`${adresse}/users/avatar/${user.details.name}`, { headers })
      .catch((e) => console.log(e));
  };
  const headers = {
    Authorization: 'Bearer ' + `${getUser().token}`,
  };

  return (
    <Layout>
      <div>
        <h1>{user.details.name}</h1>
        <ProfileImage
          key={Date.now()}
          src={avatar ? `${adresse}/${avatar}` : fighter}
          alt="zdjęcie użytkownika"
          width={300}
          height={300}
        />
        <Form
          onSubmit={(event) =>
            postPhoto(event)(adresse, `/users/addAvatar`, user, 'avatar', file, user.details.name)
          }
        >
          <Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Wgraj swój awatar</Form.Label>
              <Form.Control
                className="form"
                type="file"
                name="avatar"
                onChange={(e) => handleImageChange(e)}
                accept="image/png, image/jpeg, image/jpg"
              />
            </Form.Group>
            <input
              readOnly
              hidden={hidden.hidden}
              name={hidden.name}
              value={hidden.value}
              type={hidden.type}
            />
          </Form.Group>
          <Button type="submit">Wgraj zdjęcie</Button>
        </Form>
      </div>
      <div className="img">
        {preview !== null && sent === false ? (
          <Image alt="zdęcie profilowe" src={preview} width={150} height={150} />
        ) : null}
      </div>
      {error}
    </Layout>
  );
};

export default privateRoute(Myprofile, { pathAfterFailure: '/login' });
