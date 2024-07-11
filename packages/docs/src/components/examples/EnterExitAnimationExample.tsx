import sharedStyles from "@site/src/css/shared.module.scss";
import { animation, toast, Toaster } from "@toastup/react";
import styles from "./examples.module.scss";

export function EnterExitAnimationExample() {
  const handleClick = () =>
    toast.add({
      inAnimation: animation.in.bounceHorizontallyIn,
      outAnimation: animation.out.singleBounceVerticallyOut,
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
