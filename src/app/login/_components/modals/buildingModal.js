import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../../../styles/buildingModal.module.scss';

const BuildingModal = ({ show }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalContent = show ? (
    <div className={styles.modalContainer}>
      <div className={styles.modalItem}>
        <button>Wybuduj</button>
      </div>
    </div>
  ) : null;
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
  } else {
    return null;
  }
};

export default BuildingModal;
