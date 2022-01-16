import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import styles from "../../styles/Duolingo.module.css";

export const images = [
  {
    file: "achievement-wildfire.svg",
    text: "Wildfire",
    description: "You reached a 50 day streak",
  },
  {
    file: "achievement-sage.svg",
    text: "Sage",
    description: "You earned 20000 XP!",
  },
  {
    file: "achievement-scholar.svg",
    text: "Scholar",
    description: "1000 new words in a single course",
  },
  {
    file: "achievement-regal-gold.svg",
    text: "Regal",
    description: "You earned 100 crowns",
  },
  {
    file: "achievement-champion.svg",
    text: "Champion",
    description: "You advanced to the Amethyst league",
  },
];
export default function Home() {
  return (
    <div className={styles.container}>
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
