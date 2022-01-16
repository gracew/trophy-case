import Davatar from "@davatar/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import styles from "../styles/UserComponent.module.css";

export default function User(props) {
  const [ens, setEns] = useState();
  useEffect(() => {
    fetch(`https://deep-index.moralis.io/api/v2/resolve/${props.address}/reverse`, {
      headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_KEY,
      }
    }).then(res => res.json())
      .then(parsed => setEns(parsed.name));
  })
  return (
    <div className={styles.user}>
      <Davatar size={80} address={props.address} />
      <div className={styles.userAddress}>{ens ? ens : props.address}</div>
    </div>
  );
}
