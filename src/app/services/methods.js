import axios from 'axios';
import { getUser } from './auth';
import { adresse } from '../../config';

const user = getUser();
export const postPhoto =
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
        return res;
      })
      .catch((error) => console.log(error));
  };

export const fetchFromApi = async (url, func) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    params: {
      name: user.details.name,
    },
  };
  const result = await axios.get(`${adresse}${url}`, config);
  func(result);
};

export const gatherHandler = (gather, startGather, startRessource) => {
  const result = Math.floor((gather - startGather) / 1000 / 60 + startRessource);
  return result;
};
