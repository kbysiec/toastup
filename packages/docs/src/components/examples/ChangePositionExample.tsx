import sharedStyles from "@site/src/css/shared.module.scss";
import { position, toast, Toaster } from "@toastup/react";
import styles from "./examples.module.scss";

export function ChangePositionExample() {
  const positions = Object.keys(position);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const randomKey = positions[randomIndex];

    toast.add({
      position: position[randomKey],
    });
  };
  return (
    <div>
      <button
        className={`${sharedStyles.buttonPrimary} ${styles.button}`}
        onClick={handleClick}
      >
        Add toast
      </button>
      <Toaster />
    </div>
  );
}
