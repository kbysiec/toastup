import sharedStyles from "@site/src/css/shared.module.scss";
import { toast, Toaster, type } from "@toastup/react";
import styles from "./examples.module.scss";

export function ChooseTypeExample() {
  const types = Object.keys(type);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * types.length);
    const randomKey = types[randomIndex];

    toast.add({
      type: type[randomKey],
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
