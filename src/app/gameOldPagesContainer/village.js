import { Layout } from '../src/hoc/layout';
import VillageView from '../src/_components/village/villageView';
import { fetchFromApi, gatherHandler } from '../src/services/methods';
import { useEffect, useState } from 'react';
import { getUser } from '../src/services/auth';
import BuildingModal from '../src/_components/modals/buildingModal';

const Village = () => {
  const [data, setData] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [food, setFood] = useState('');
  const [gather, setGather] = useState(parseInt(Date.now(), 10));

  const granaries =
    data &&
    data.data &&
    data.data.slots &&
    data.data.slots
      .filter((slot) => (Object.keys(slot)[0] === 'granary' ? slot + 1 : null))
      .concat([1]);
  const foodCapacity =
    data && data.data && data.data.slots && granaries.reduce((a, b) => a + b) * 500;
  const [openBuildModal, setOpenBuildModal] = useState(false);

  const buildHandler = (e) => {
    setOpenBuildModal(!openBuildModal);
    console.log(e.target.innerText);
  };

  useEffect(() => {
    let interval = null;
    const startGather =
      data && data.data && data.data.startGather && parseInt(data.data.startGather, 10);
    const startFood = data && data.data && data.data.foodStart;
    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      setGather((gather) => parseInt(gather, 10) + 1000);
      setFood(
        gatherHandler(gather, startGather, startFood) < foodCapacity
          ? gatherHandler(gather, startGather, foodStart)
          : foodCapacity,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    const user = getUser();
    fetchFromApi(`/map/tileMap/${user.details.ownVillagesArray[0]}`, setData);
  }, []);
  console.log(openBuildModal);
  return (
    <Layout>
      <h5>żywność: {food}</h5>
      <VillageView
        slotsArray={
          data && data.data && data.data.slots
            ? data.data.slots.map((slot) => Object.keys(slot)[0])
            : []
        }
        click={(e) => buildHandler(e)}
      />
      <div id="modal-root"></div>
      <div>
        <BuildingModal
          // onClose={() => setOpenBuildModal(false)}
          show={openBuildModal}
        />
      </div>
      <h4>{seconds}</h4>
    </Layout>
  );
};

export default Village;
