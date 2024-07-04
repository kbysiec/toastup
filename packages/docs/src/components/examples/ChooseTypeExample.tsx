import sharedStyles from "@site/src/css/shared.module.scss";
import { add, Toaster, type } from "@toastup/react";
import "animate.css";

export function ChooseTypeExample() {
  const types = Object.keys(type);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * types.length);
    const randomKey = types[randomIndex];

    add({
      type: type[randomKey],
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
