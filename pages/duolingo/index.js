import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Image from "next/image";
import { duolingoNftAddress } from "../../config";
import styles from "../../styles/Duolingo.module.css";

export const images = [
  {
    address: duolingoNftAddress,
    file: "achievement-wildfire.svg",
    text: "Wildfire",
    description: "You reached a 50 day streak",
  },
  {
    address: duolingoNftAddress,
    file: "achievement-sage.svg",
    text: "Sage",
    description: "You earned 20000 XP!",
  },
  {
    address: duolingoNftAddress,
    file: "achievement-scholar.svg",
    text: "Scholar",
    description: "1000 new words in a single course",
  },
  {
    address: duolingoNftAddress,
    file: "achievement-regal-gold.svg",
    text: "Regal",
    description: "You earned 100 crowns",
  },
  {
    address: duolingoNftAddress,
    file: "achievement-champion.svg",
    text: "Champion",
    description: "You advanced to the Amethyst league",
  },
];
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Duolingo</title>
        <link rel="icon" href="/duolingo.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.titleDuolingo}>
          <img
            src="https://logos-world.net/wp-content/uploads/2021/03/Duolingo-Symbol.png"
            width="70px"
          ></img>
          Duolingo Achievements
        </h1>

        <div className={styles.grid}>
          {images.map(({ file, text, description }) => (
            <a href={`badge/${text}`} className={styles.card} key={text}>
              <div className={styles.badgeContainer}>
                <Image
                  src={`/images/${file}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div>
                <h2>{text}</h2>
                <p className={styles.badgeDescription}>{description}</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
