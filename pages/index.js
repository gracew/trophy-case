import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import Web3Modal from "web3modal";
import Badge from "../components/badge";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [badges, setBadges] = useState([]);
  const [address, setAddress] = useState();

  useEffect(() => {
    fetch('https://deep-index.moralis.io/api/v2/0x06e6f7d896696167b2da9281ebaf8a14580fbfcc/nft?chain=mumbai&format=decimal', {
      headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_KEY,
        'accept': 'application/json',
      }
    }).then(res => res.json())
      .then(parsed => setBadges(parsed.result));
  }, [])

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.selectedAddress) {
      // setAddress(ethereum.selectedAddress);
    }
  });

  async function connectWallet() {
    const web3Modal = new Web3Modal({ providerOptions: {} });
    const connection = await web3Modal.connect();
    setAddress(connection.selectedAddress);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {!address && <Button onClick={connectWallet} style={{ marginTop: 50 }}>Connect Wallet</Button>}
        {address &&
          <div className={styles.mainUserContainer}>
            <div>
              <div className={styles.mainUserImageContainer}>
                <Image src="/images/mcallister.png" layout="fill" objectFit="contain" />
              </div>
              <h1 className={styles.title}>sammy.eth</h1>
            </div>
          </div>}

        {address && <div>
          <Nav className={styles.nav}>
            <Nav.Item>
              <Nav.Link>My Badges</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Similar to You</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className={styles.grid}>
            {badges.filter(badge => badge.metadata).map(badge =>
              <a href={`https://testnets.opensea.io/assets/mumbai/${badge.token_address}/${badge.token_id}`}>
                <Badge key={badge.token_id} contractName={badge.name} metadata={badge.metadata} />
              </a>
            )}
          </div>
        </div>}
      </main>
    </div>
  );
}
