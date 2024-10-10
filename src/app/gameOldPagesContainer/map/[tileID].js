import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../src/hoc/layout';
import { getUser, isLoggedIn } from '../../src/services/auth';
import axios from 'axios';
import { adresse } from '../../config';
import Greenfield from '../../src/_components/map/greenfield';
import Castle from '../../src/_components/map/castle';
import Forest from '../../src/_components/map/forest';
import Stone from '../../src/_components/map/stone';
import Silver from '../../src/_components/map/silver';
import Iron from '../../src/_components/map/iron';
import Crop from '../../src/_components/map/crop';
import MagicSpot from '../../src/_components/map/magicspot';

const location = (type) => {
  switch (type) {
    case '1':
      return <Forest />;
      break;
    case '2':
      return <Stone />;
      break;
    case '3':
      return <Silver />;
      break;
    case '4':
      return <Castle />;
      break;
    case '5':
      return <Iron />;
      break;
    case '6':
      return <Crop />;
      break;
    case '7':
      return <Greenfield />;
      break;
    case '8':
      return <MagicSpot />;
      break;
    default:
      console.log(`no terrain type switched`);
  }
};

export default function MapTile() {
  const [data, setData] = useState({});
  const user = getUser();
  const router = useRouter();
  const { tileID } = router.query;
  console.log(tileID);

  const fetchTileFromApi = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const result = await axios.get(`${adresse}/map/tileMap/${tileID}`, config);
    setData(result);
  };
  useEffect(() => {
    fetchTileFromApi();
    return () => {
      //   console.log("wyczyszczone");
    };
  }, [tileID]);

  console.log(data);
  return (
    <Layout>
      <div>
        <h1>{data && data.data && data.data.name}</h1>
        <h4>
          współrzędne [{data && data.data && data.data.positionX},
          {data && data.data && data.data.positionY}]
        </h4>
        <h4>
          {data && data.data && data.data.available
            ? 'możliwe do osiedlenia'
            : data && data.data && data.data.race}
        </h4>
        <h5>{data && data.data && location(data.data.terrainType)}</h5>
        <div>
          <h6>
            {data && data.data && data.data.wildDog ? `zdziczałe psy: ${data.data.wildDog}` : null}
          </h6>
          <h6>{data && data.data && data.data.dragon ? `smoki: ${data.data.dragon}` : null}</h6>
          <h6>
            {data && data.data && data.data.foodStart ? `żywność: ${data.data.foodStart}` : null}
          </h6>
          <h6>
            {data && data.data && data.data.ironStart
              ? `ruda żelaza: ${data.data.ironStart}`
              : null}
          </h6>
        </div>
      </div>
    </Layout>
  );
}
