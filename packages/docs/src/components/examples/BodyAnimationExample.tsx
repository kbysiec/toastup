import sharedStyles from "@site/src/css/shared.module.scss";
import { toast, Toaster } from "@toastup/react";
import styles from "./examples.module.scss";

export function BodyAnimationExample() {
  const handleClick = () =>
    toast.add({
      animateBody: true,
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
