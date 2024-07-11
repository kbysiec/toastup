import sharedStyles from "@site/src/css/shared.module.scss";
import CustomIcon from "@site/static/img/toast.svg";
import { toast, Toaster } from "@toastup/react";
import styles from "./examples.module.scss";

export function CustomIconExample() {
  const handleClick = () =>
    toast.add({
      icon: () => <CustomIcon className={styles.customIcon} />,
    });
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
