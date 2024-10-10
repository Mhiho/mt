import Image from 'next/image';
import styles from '../../../styles/villageView.module.scss';

const VillageView = (props) => {
  return (
    <div className={styles.villageContainer}>
      <div className={styles.frameVillage}>
        {props.slotsArray.map((slot, index) => {
          return (
            <div onClick={props.click} key={`villageSlot-${index}`} className={styles.slot}>
              {slot}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default VillageView;
