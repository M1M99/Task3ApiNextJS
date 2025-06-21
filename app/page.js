import styles from "./page.module.css";
import Students from "./students/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <Students/>
    </div>
  );
}
