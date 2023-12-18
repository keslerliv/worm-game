import { useMainContext } from "../../../../context/mainContext";
import { getBlockDirection } from "../../../../utils";

import styles from "./styles.module.scss";

export default function Worm() {
  const { blockSize, wormBody, moveDirection } = useMainContext();

  return (
    <div className={styles.worm}>
      {wormBody.map((item, index) => (
        <div
          style={{
            width: `${blockSize}px`,
            left: `${item[0] * blockSize}px`,
            top: `${item[1] * blockSize}px`,
          }}
          className={`
            ${styles.wormBody} 
            ${index === 0 ? styles[moveDirection + "Face"] : ""}
            ${
              index === wormBody.length - 1
                ? styles[getBlockDirection(wormBody, index)]
                : ""
            }
          `}
          key={index}
        />
      ))}
    </div>
  );
}
