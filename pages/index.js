import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export const images = [
  { file: "achievement-wildfire.svg", text: "Wildfire" },
  { file: "achievement-sage.svg", text: "Sage" },
  { file: "achievement-scholar.svg", text: "Scholar" },
  { file: "achievement-regal-gold.svg", text: "Regal" },
  { file: "achievement-champion.svg", text: "Champion" },
]
export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Achievements</h1>

        <div className={styles.grid}>
          {images.map(({ file, text }) => (
            <a href={`badge/${text}`} className={styles.card}>
              <div className={styles.badgeContainer}>
                <Image src={`/images/${file}`} layout="fill" objectFit="contain" />
              </div>
              <h2>{text}</h2>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}
