import styles from './legend.module.scss';

export const Legend = (props) => {
  return (
    <div className={styles.legend}>
      <div className={styles.legendTitle}>Legenda:</div>
      <div className={styles.legendContainer}>
        <div className={styles.side}>
          <div className={styles.line}>
            <div className={styles.forest}></div>
            <div className={styles.p}>- las</div>
          </div>
          <div className={styles.line}>
            <div className={styles.stone}></div>
            <div className={styles.p}>- złoże kamienia</div>
          </div>
          <div className={styles.line}>
            <div className={styles.silver}></div>
            <div className={styles.p}>- złoże srebra</div>
          </div>
          <div className={styles.line}>
            <div className={styles.castle}></div>
            <div className={styles.p}>- ruiny zamku</div>
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.line}>
            <div className={styles.iron}></div>
            <div className={styles.p}>- złoże rudy żelaza</div>
          </div>
          <div className={styles.line}>
            <div className={styles.crop}></div>
            <div className={styles.p}>- pola</div>
          </div>
          <div className={styles.line}>
            <div className={styles.greenfield}></div>
            <div className={styles.p}>- łąka</div>
          </div>
          <div className={styles.line}>
            <div className={styles.magic}></div>
            <div className={styles.p}>- uroczysko</div>
          </div>
        </div>
        <div className={styles.side}>
          <div className={styles.line}>
            <div className={styles.hern}></div>
            <div className={styles.p}>- wioska/zamek Hern</div>
          </div>
          <div className={styles.line}>
            <div className={styles.patr}></div>
            <div className={styles.p}>- wioska/zamek Patremonium</div>
          </div>
          <div className={styles.line}>
            <div className={styles.hord}></div>
            <div className={styles.p}>- wioska/zamek Hord</div>
          </div>
          <div className={styles.line}>
            <div className={styles.ally}></div>
            <div className={styles.p}>- sojusznik</div>
          </div>
        </div>
      </div>
    </div>
  );
};
