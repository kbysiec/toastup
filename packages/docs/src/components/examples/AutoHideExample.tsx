import sharedStyles from "@site/src/css/shared.module.scss";
import { toast, Toaster } from "@toastup/react";
import styles from "./examples.module.scss";

export function AutoHideExample() {
  const handleClick = () => toast.add({ autoHide: 10000 });
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
