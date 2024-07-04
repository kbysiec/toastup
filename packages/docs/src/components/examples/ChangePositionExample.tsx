import sharedStyles from "@site/src/css/shared.module.scss";
import { add, position, Toaster } from "@toastup/react";
import "animate.css";

export function ChangePositionExample() {
  const positions = Object.keys(position);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const randomKey = positions[randomIndex];

    add({
      position: position[randomKey],
    });
  };
  return (
    <div>
      <button className={sharedStyles.buttonPrimary} onClick={handleClick}>
        Add toast
      </button>
      <Toaster />
    </div>
  );
}
