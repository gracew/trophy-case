import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "../styles/BadgeComponent.module.css";

export default function Badge(props) {
  const metadata = JSON.parse(props.metadata);
  return (
    <div className={styles.badge}>
      {metadata && metadata.image.startsWith("https") && <div className={styles.badgeContainer}>
        <Image src={metadata.image} layout="fill" objectFit="contain" />
      </div>}
      <div className={styles.contractName}>{props.contractName}</div>
      {metadata && <div className={styles.tokenName}>{metadata.name}</div>}
    </div>
  );
}
