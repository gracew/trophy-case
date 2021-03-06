import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Image from "next/image";
import { CgAppleWatch } from "react-icons/cg";
import { appleNftAddress } from "../../config";
import styles from "../../styles/Duolingo.module.css";


export const images = [
  {
    address: appleNftAddress,
    file: "achievement-apple-heart-month.svg",
    text: "Heart",
    description: "You completed the Heart Month challenge",
  },
  {
    address: appleNftAddress,
    file: "achievement-apple-mothers-day.svg",
    text: "Mother",
    description: "You completed the Mother's Day challenge",
  },
  {
    address: appleNftAddress,
    file: "achievement-apple-new-year.svg",
    text: "Ring",
    description: "You completed the New Year challenge",
  },
  {
    address: appleNftAddress,
    file: "achievement-apple-veterans-day.svg",
    text: "Veterans",
    description: "You completed the Veterans Day challenge",
  },
  {
    address: appleNftAddress,
    file: "achievement-apple-national-parks.svg",
    text: "National",
    description: "You completed the National Parks challenge",
  },
];
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Apple Health</title>
        <link rel="icon" href="/applehealth.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.titleApple}>
          <CgAppleWatch />
          Apple Watch Awards
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
