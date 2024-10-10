import React, { useState, useEffect } from 'react';
import { Layout } from '../../src/hoc/layout';
import { Square } from '../../src/_components/map/square';
import { Legend } from '../../src/_components/map/legend';
import axios from 'axios';
import { adresse } from '../../config';
import { getUser, isLoggedIn } from '../../src/services/auth';
import styles from '../../styles/capitalView.module.scss';
import styles2 from '../../src/_components/map/square.module.scss';
import privateRoute from '../../src/hoc/privateRoute';
import Draggable from 'react-draggable';
import router from 'next/router';

function CapitalView() {
  //setXY - długość boków mapy
  const setXY = 60;
  const [data, setData] = useState(null);
  const user = getUser();
  console.log(user);
  const fetchFromApi = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: {
        name: user.details.name,
      },
    };
    const result = await axios.get(
      `${adresse}/map/capitalView/${user.details.capitalPositionX}/${user.details.capitalPositionY}`,
      config,
    );
    setData(result);
  };
  useEffect(() => {
    fetchFromApi();
    return () => {
      console.log('wyczyszczone');
    };
  }, []);
  const wage = 5;
  const rayX = setXY * wage;
  const rayY = wage;
  const center = user && user.details.ownVillagesArray[0];

  const map = data && data.data;
  const maxInRow = map && Math.sqrt(map.length);
  const length = setXY * setXY + 1;

  let ar = [];
  const makeSquare = (map) => {
    for (let x = 1; x < length; x++) {
      let array = map.filter((tile, index) => {
        if (tile.tileID >= x && tile.tileID < x + setXY) {
          return tile;
        }
      });
      ar.push(array);
      x = x + (setXY - 1);
    }
    return ar;
  };
  const finalArray = data && data.data && data.data.map && makeSquare(map, maxInRow);
  const colorTerrain = (type) => {
    switch (type) {
      case '1':
        return 'green';
        break;
      case '2':
        return 'grey';
        break;
      case '3':
        return 'silver';
        break;
      case '4':
        return 'navy';
        break;
      case '5':
        return '#333333';
        break;
      case '6':
        return 'gold';
        break;
      case '7':
        return 'lightgreen';
        break;
      case '8':
        return 'darkred';
        break;
      default:
        console.log(`no terrain type switched`);
    }
  };
  return (
    <Layout>
      <div className={styles.frame}>
        <div>
          <div className={styles.mapContainer}>
            {data &&
              data.data &&
              data.data.map &&
              finalArray.map((row, index) => (
                <div className={styles.centerScreen} key={`map-row-${index}`}>
                  {row.map((tile, index) => (
                    <div key={`map-col-${index}`} className={styles.col}>
                      <Square
                        className={styles2.squareCapitalView}
                        href={`${tile.tileID}`}
                        key={`map-tile-${index}`}
                        terrainType={''}
                        color={`${colorTerrain(tile.terrainType)}`}
                        x={tile.positionX}
                        y={tile.positionY}
                      />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      <Legend />
    </Layout>
  );
}

export default privateRoute(CapitalView, { pathAfterFailure: '/login' });
