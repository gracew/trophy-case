import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import Badge from "../components/badge";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    fetch('https://deep-index.moralis.io/api/v2/0x06e6f7d896696167b2da9281ebaf8a14580fbfcc/nft?chain=mumbai&format=decimal', {
      headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_KEY,
        'accept': 'application/json',
      }
    }).then(res => res.json())
      .then(parsed => setBadges(parsed.result));
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.mainUserContainer}>
          <div>
            <div className={styles.mainUserImageContainer}>
              <Image src="/images/mcallister.png" layout="fill" objectFit="contain" />
            </div>
            <h1 className={styles.title}>sammy.eth</h1>
          </div>
        </div>

        <div>
          <Nav className={styles.nav}>
            <Nav.Item>
              <Nav.Link>My Badges</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Similar to You</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className={styles.grid}>
            {badges.filter(badge => badge.metadata).map(badge => <Badge key={badge.token_id} contractName={badge.name} metadata={badge.metadata} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
