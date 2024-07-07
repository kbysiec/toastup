import sharedStyles from "@site/src/css/shared.module.scss";
import {
  add,
  animationType,
  Toaster,
  ToastInAnimation,
  ToastOutAnimation,
} from "@toastup/react";
import "animate.css";
import styles from "./examples.module.scss";

const animateCssFlipXInAnimation: ToastInAnimation = {
  type: animationType.in,
  className: "animate__animated animate__flipInX",
  animationTime: 450,
};

const animateCssFlipXOutAnimation: ToastOutAnimation = {
  type: animationType.out,
  className: "animate__animated animate__flipOutX",
  animationTime: 450,
};

export function CustomAnimationExample() {
  const handleClick = () =>
    add({
      inAnimation: animateCssFlipXInAnimation,
      outAnimation: animateCssFlipXOutAnimation,
    });
  return (
    <div>
      <button className={`${sharedStyles.buttonPrimary} ${styles.button}`} onClick={handleClick}>
        Add toast with animate.css
      </button>
      <Toaster />
    </div>
  );
}
