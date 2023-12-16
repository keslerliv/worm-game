import { useState } from "react";
import styles from "./styles.module.scss";

export default function Worm() {
  const [wormSize, setWormSize] = useState(1);

  return <div className={styles.worm}></div>;
}
