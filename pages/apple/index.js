import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "../../styles/Duolingo.module.css";

import { CgAppleWatch } from "react-icons/cg";

export const images = [
  {
    file: "achievement-apple-heart-month.svg",
    text: "Heart",
    description: "You completed the Heart Month challenge",
  },
  {
    file: "achievement-apple-mothers-day.svg",
    text: "Mother",
    description: "You completed the Mother's Day challenge",
  },
  {
    file: "achievement-apple-new-year.svg",
    text: "Ring",
    description: "You completed the New Year challenge",
  },
  {
    file: "achievement-apple-veterans-day.svg",
    text: "Veterans",
    description: "You completed the Veterans Day challenge",
  },
  {
    file: "achievement-apple-national-parks.svg",
    text: "National",
    description: "You completed the National Parks challenge",
  },
];
export default function Home() {
  return (
    <div className={styles.container}>
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
