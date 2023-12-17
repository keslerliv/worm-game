import { useMainContext } from "../../../../context/mainContext";

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
            left: `${food[0] * blockSize}px`,
            top: `${food[1] * blockSize}px`,
          }}
          className={styles.food}
        ></div>
      ))}
    </div>
  );
}
