import { useMainContext } from "../../../../context/mainContext";

import styles from "./styles.module.scss";

export default function Worm() {
  const { blockSize, wormBody } = useMainContext();

  return (
    <div className={styles.worm}>
      {wormBody.map((item, index) => (
        <div
          style={{
            width: `${blockSize}px`,
            left: `${item[0] * blockSize}px`,
            top: `${item[1] * blockSize}px`,
          }}
          className={styles.wormBody}
          key={index}
        ></div>
      ))}
    </div>
  );
}
