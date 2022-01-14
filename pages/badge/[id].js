import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Offcanvas } from "react-bootstrap";
import Web3Modal from "web3modal";
import CenteredSpinner from '../../components/centeredSpinner';
import styles from '../../styles/Badge.module.css';
import { images } from '../index';


export default function Badge() {
  const router = useRouter();
  const { id } = router.query;
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [address, setAddress] = useState();

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.selectedAddress) {
      setAddress(ethereum.selectedAddress);
    }
  });

  if (!id) {
    return (
      <div className={styles.container}>
        <CenteredSpinner />
      </div>
    );
  }

  const web3Modal = new Web3Modal({ providerOptions: {} });
  web3Modal.on('connect', info => {
    console.log(info.selectedAddress);
    setAddress(info.selectedAddress);
  });
  const image = images.find(({ text }) => text === id);

  async function claimNFT() {
    // connect wallet if needed
    const provider = await web3Modal.connect();
    await provider.enable();
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {id} Achievement
        </h1>

        <div className={styles.badgeContainer}>
          <Image src={`/images/${image.file}`} layout="fill" objectFit="contain" />
        </div>

        <Button size="lg" onClick={() => setShowOffcanvas(true)}>Claim as NFT</Button>
        <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="bottom" className={styles.offcanvas}>
          <Offcanvas.Header>
            <Offcanvas.Title>Claim as NFT</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {address && <Button>Send to {address}</Button>}
            {!address && <Button size="lg" onClick={() => setShowOffcanvas(true)} onClick={claimNFT}>Claim</Button>}
          </Offcanvas.Body>
        </Offcanvas>
      </main>
    </div>
  )
}
