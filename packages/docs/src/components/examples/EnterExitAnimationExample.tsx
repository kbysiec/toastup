import sharedStyles from "@site/src/css/shared.module.scss";
import {
  add,
  bounceHorizontallyIn,
  singleBounceVerticallyOut,
  Toaster
} from "@toastup/react";
import "animate.css";
import styles from "./examples.module.scss";

export function EnterExitAnimationExample() {
  const handleClick = () =>
    add({
      inAnimation: bounceHorizontallyIn,
      outAnimation: singleBounceVerticallyOut,
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
