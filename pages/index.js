import Davatar from "@davatar/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import Web3Modal from "web3modal";
import Badge from "../components/badge";
import User from "../components/user";
import styles from "../styles/Home.module.css";

function getBadgesForAddress(address) {
  return fetch(`https://deep-index.moralis.io/api/v2/${address}/nft?chain=mumbai&format=decimal`, {
    headers: {
      'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_KEY,
    }
  }).then(res => res.json())
    .then(parsed => parsed.result);
}

export default function Home() {
  const [badges, setBadges] = useState([]);
  const [address, setAddress] = useState();
  const [ens, setEns] = useState();
  const [tab, setTab] = useState("badges");
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.selectedAddress) {
      setAddress(ethereum.selectedAddress);
    }
  });

  useEffect(() => {
    if (address) {
      getBadgesForAddress(address).then(badges => {
        const cleaned = badges.map(badge => {
          const metadata = JSON.parse(badge.metadata);
          return { ...badge, metadata };
        });
        setBadges(cleaned);
      });

      // lookup ENS
      fetch(`https://deep-index.moralis.io/api/v2/resolve/${address}/reverse`, {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_KEY,
        }
      }).then(res => res.json())
        .then(parsed => setEns(parsed.name));
    }
  }, [address]);

  useEffect(() => {
    similarAddresses();
  }, [badges]);

  async function similarAddresses() {
    const contracts = new Set(badges.map(badge => badge.token_address));

    // get other holders of the same token
    const users = new Set();
    await Promise.all(Array.from(contracts).map(async contract => {
      const parsed = await fetch(`https://deep-index.moralis.io/api/v2/nft/${contract}/owners?chain=mumbai&format=decimal`, {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_KEY,
        }
      }).then(res => res.json());
      parsed.result.forEach(res => users.add(res.owner_of));
    }));

    // get those users' badges
    const similarity = {};
    await Promise.all(Array.from(users).filter(user => user !== address).map(async user => {
      const userBadges = await getBadgesForAddress(user);
      const userContracts = new Set(userBadges.map(badge => badge.token_address));
      const numShared = Array.from(userContracts).filter(i => contracts.has(i)).length;
      similarity[user] = numShared;
    }));

    // rank by who has the most shared collections
    setSimilar(Object.entries(similarity).sort((a, b) => b[1] - a[1]));
  }

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
              <Davatar size={170} address={address} />
              <h1 className={styles.title}>{ens ? ens : address}</h1>
            </div>
          </div>}

        {address && <div>
          <Nav className={styles.nav} activeKey="badges" onSelect={setTab}>
            <Nav.Item>
              <Nav.Link eventKey="badges" className={tab === "badges" ? styles.activeNavLink : styles.navLink}>My Badges</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="similar" className={tab === "similar" ? styles.activeNavLink : styles.navLink}>Similar to You</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className={styles.grid}>
            {tab === "badges" && badges.filter(badge => badge.metadata && badge.metadata.image.startsWith("https")).map(badge =>
              <a key={badge.token_id} className={styles.badgeLink}
                href={`https://testnets.opensea.io/assets/mumbai/${badge.token_address}/${badge.token_id}`}>
                <Badge contractName={badge.name} metadata={badge.metadata} />
              </a>
            )}
            {tab === "similar" && similar.map(similar => <User key={similar[0]} address={similar[0]} />)}
          </div>
        </div>}
      </main>
    </div>
  );
}
