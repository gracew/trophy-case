import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from "react-bootstrap";
import CenteredSpinner from '../../components/centeredSpinner';
import styles from '../../styles/Badge.module.css';
import { images } from '../index';

export default function Badge() {
  const router = useRouter();
  const { id } = router.query;

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

        <Button size="lg">Claim as NFT</Button>
      </main>
    </div>
  )
}
