import { useMainContext } from "../../../../context/mainContext";

import Fish from "../../../../assets/images/fish.png";

import styles from "./styles.module.scss";

export default function Detail() {
  const { details, blockSize } = useMainContext();

  return (
    <div className={styles.container}>
      {details.map((item, index) => (
        <img
          key={index}
          src={Fish}
          alt="Fish"
          style={{
            width: `${blockSize}px`,
            left: `${item[0] * blockSize}px`,
            top: `${item[1] * blockSize}px`,
          }}
        />
      ))}
    </div>
  );
}
