import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

export const images = [
  {
    file: "achievement-apple-heart-month.svg",
    text: "Heart",
    description: "Heart Month badge",
  },
  {
    file: "achievement-apple-mothers-day.svg",
    text: "Mother",
    description: "Mother's Day badge",
  },
  {
    file: "achievement-apple-new-year.svg",
    text: "Ring",
    description: "New Year badge",
  },
  {
    file: "achievement-apple-veterans-day.svg",
    text: "Veterans",
    description: "Veterans Day badge",
  },
  {
    file: "achievement-apple-national-parks.svg",
    text: "National",
    description: "National Parks badge",
  },
];
export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Achievements</h1>

        <div className={styles.grid}>
          {images.map(({ file, text }) => (
            <a href={`badge/${text}`} className={styles.card} key={text}>
              <div className={styles.badgeContainer}>
                <Image
                  src={`/images/${file}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h2>{text}</h2>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
