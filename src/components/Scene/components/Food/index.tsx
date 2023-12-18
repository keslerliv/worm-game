import Lottie from "lottie-react";
import { useMainContext } from "../../../../context/mainContext";

import bitcoin from "../../../../assets/animation/bitcoin.json";

import styles from "./styles.module.scss";

export default function Food() {
  const { blockSize, foods } = useMainContext();

  return (
    <div className={styles.container}>
      {foods.map((food: any, index: number) => (
        <div
          key={index}
          style={{
            width: `${blockSize}px`,
            height: `${blockSize}px`,
            left: `${food[0] * blockSize}px`,
            top: `${food[1] * blockSize}px`,
          }}
          className={styles.food}
        >
          <Lottie animationData={bitcoin} />
        </div>
      ))}
    </div>
  );
}
