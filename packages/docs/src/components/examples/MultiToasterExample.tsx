import sharedStyles from "@site/src/css/shared.module.scss";
import { toast, Toaster } from "@toastup/react";
import styles from "./examples.module.scss";

export function MultiToasterExample() {
  const handleClickLeft = () =>
    toast.add({
      rtl: true,
      toasterId: "toaster-left",
      type: "success",
      position: "bottom-left",
    });

  const handleClickRight = () =>
    toast.add({ rtl: true, toasterId: "toaster-right" });
  return (
    <div>
      <div className={styles.buttonsRow}>
        <button
          className={`${sharedStyles.buttonPrimary} ${styles.button}`}
          onClick={handleClickLeft}
        >
          Add toast left
        </button>
        <button
          className={`${sharedStyles.buttonPrimary} ${styles.button}`}
          onClick={handleClickRight}
        >
          Add toast right
        </button>
      </div>
      <Toaster toasterId="toaster-left" />
      <Toaster toasterId="toaster-right" />
    </div>
  );
}
