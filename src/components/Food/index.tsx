import { FoodProps } from "../../types";
import styles from "./styles.module.scss";

export default function Food({ size, foods }: FoodProps) {
  return (
    <div className={styles.container}>
      {foods.map((food, index) => (
        <div
          key={index}
          style={{
            width: `${size}px`,
            left: `${food[0] * size}px`,
            top: `${food[1] * size}px`,
          }}
          className={styles.food}
        ></div>
      ))}
    </div>
  );
}
