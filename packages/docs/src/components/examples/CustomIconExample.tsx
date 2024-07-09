import sharedStyles from "@site/src/css/shared.module.scss";
import CustomIcon from "@site/static/img/toast.svg";
import { add, Toaster } from "@toastup/react";
import styles from "./examples.module.scss";

export function CustomIconExample() {
  const handleClick = () => add({
    icon: () => <CustomIcon className={styles.customIcon} />,
  });
  return (
    <div>
      <button className={`${sharedStyles.buttonPrimary} ${styles.button}`} onClick={handleClick}>
        Add toast
      </button>
      <Toaster />
    </div>
  );
}
