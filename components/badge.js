import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "../styles/BadgeComponent.module.css";

export default function Badge(props) {
  return (
    <div className={styles.badge}>
      <div className={styles.badgeContainer}>
        <Image src={props.metadata.image} layout="fill" objectFit="contain" />
      </div>
      <div className={styles.contractName}>{props.contractName}</div>
      {props.metadata && <div className={styles.tokenName}>{props.metadata.name}</div>}
    </div>
  );
}
