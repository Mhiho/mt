import styles from './square.module.scss';
import Link from 'next/link';

export const Square = (props) => {
  return (
    <>
      <div className={props.className} style={{ background: props.color }}>
        <h6>{props.terrainType}</h6>
        <Link href={props.href} passHref={true}>
          <h6>
            [{props.x},{props.y}]
          </h6>
        </Link>
      </div>
    </>
  );
};
