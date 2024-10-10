import React, { useState, useEffect } from 'react';
import { Layout } from '../../src/hoc/layout';
import { Square } from '../../src/_components/map/square';
import { Legend } from '../../src/_components/map/legend';
import axios from 'axios';
import { adresse } from '../../config';
import { getUser, isLoggedIn } from '../../src/services/auth';
import styles from '../../styles/ownMap.module.scss';
import styles2 from '../../src/_components/map/square.module.scss';
import privateRoute from '../../src/hoc/privateRoute';
import Draggable from 'react-draggable';
import router from 'next/router';
import { fetchFromApi } from '../../src/services/methods';

function Ownmap() {
  //setXY - długość boków mapy
  const setXY = 60;
  const [data, setData] = useState(null);
  const user = getUser();
  console.log(user);

  useEffect(() => {
    fetchFromApi('/map/wholemap', setData);
    return () => {
      console.log('wyczyszczone');
    };
  }, []);
  console.log(data);
  const map = data && data.data && data.data.map;
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

  const [pos, setPos] = useState({ x: 0, y: 0, scale: 1, conX: 0, conY: 0 });

  const onScroll = (e) => {
    const delta = e.deltaY * -0.001;
    const newScale = pos.scale + delta;

    const ratio = 1 - newScale / pos.scale;
    setPos({
      scale: newScale,
      x: pos.x + (e.clientX - pos.x) * ratio,
      y: pos.y + (e.clientY - pos.y) * ratio,
    });
  };
  console.log(pos.scale);
  const [findX, setFindX] = useState('');
  const [findY, setFindY] = useState('');
  const [finder, setFinder] = useState({});
  const fetchTileFromApi = async (findX, findY) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const result = await axios.get(`${adresse}/map/tileMapXY/${findX}/${findY}`, config);
    setFinder(result);
    router.push(`/map/${result.data.tileID}`);
  };
  const tileFindHandler = (e) => {
    e.preventDefault();
    findX > 0 && findX <= 60 && findY > 0 && findY <= 60 ? fetchTileFromApi(findX, findY) : null;
  };
  console.log(finder);
  return (
    <Layout>
      <div className={styles.frame}>
        <div
          style={{
            transformOrigin: '0 0',
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
          }}
        >
          <Draggable>
            <div className={styles.mapContainer}>
              {data &&
                data.data &&
                data.data.map &&
                finalArray.map((row, index) => (
                  <div
                    className={styles.centerScreen}
                    onWheelCapture={onScroll}
                    key={`map-row-${index}`}
                  >
                    {row.map((tile, index) => (
                      <div key={`map-col-${index}`} className={styles.col}>
                        <Square
                          className={styles2.square}
                          href={`${tile.tileID}`}
                          key={`map-tile-${index}`}
                          terrainType={tile.terrainType}
                          color={`${colorTerrain(tile.terrainType)}`}
                          x={tile.positionX}
                          y={tile.positionY}
                        />
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </Draggable>
        </div>
      </div>
      <div className={styles.searchTile}>
        <form onSubmit={(e) => tileFindHandler(e, findX, findY)}>
          [&#8192;
          <input
            type="number"
            min={1}
            max={60}
            onChange={(e) => setFindX(e.target.value)}
            value={findX}
            placeholder="1-60"
          />
          &#8192;,&#8192;
          <input
            type="number"
            min={1}
            max={60}
            onChange={(e) => setFindY(e.target.value)}
            value={findY}
            placeholder="1-60"
          />
          &#8192;]
          <div className={styles.buttonCont}>
            <button type="submit">Znajdź pole</button>
          </div>
        </form>
      </div>
      <Legend />
    </Layout>
  );
}

export default privateRoute(Ownmap, { pathAfterFailure: '/login' });
