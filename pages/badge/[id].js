import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Offcanvas } from "react-bootstrap";
import CenteredSpinner from '../../components/centeredSpinner';
import styles from '../../styles/Badge.module.css';
import { images } from '../index';

export default function Badge() {
  const router = useRouter();
  const { id } = router.query;
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  if (!id) {
    return (
      <div className={styles.container}>
        <CenteredSpinner />
      </div>
    );
  }

  const image = images.find(({ text }) => text === id);

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
            <Button size="lg" onClick={() => setShowOffcanvas(true)}>Claim</Button>
          </Offcanvas.Body>
        </Offcanvas>
      </main>
    </div>
  )
}
