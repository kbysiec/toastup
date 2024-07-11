import sharedStyles from "@site/src/css/shared.module.scss";
import {
  add,
  animationType,
  Toaster,
  ToastInAnimation,
  ToastInBodyAnimation,
  ToastOutAnimation,
} from "@toastup/react";
import "animate.css";
import styles from "./examples.module.scss";

const animateCssFlipXInAnimation: ToastInAnimation = {
  type: animationType.in,
  className: "animate__animated animate__flipInX",
  animationTime: 450,
};

const animateCssBounceDownOutAnimation: ToastOutAnimation = {
  type: animationType.out,
  className: "animate__animated animate__bounceOutDown",
  animationTime: 650,
};

const animateCssBounceInBodyAnimation: ToastInBodyAnimation = {
  type: animationType.body,
  className: "animate__animated animate__bounceIn",
  animationTime: 1000,
};

export function CustomAnimationExample() {
  const handleClick = () =>
    add({
      inAnimation: animateCssFlipXInAnimation,
      outAnimation: animateCssBounceDownOutAnimation,
      inBodyAnimation: animateCssBounceInBodyAnimation,
      animateBody: true,
    });
  return (
    <div>
      <button
        className={`${sharedStyles.buttonPrimary} ${styles.button}`}
        onClick={handleClick}
      >
        Add toast with animate.css
      </button>
      <Toaster />
    </div>
  );
}
