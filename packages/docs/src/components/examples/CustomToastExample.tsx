import sharedStyles from "@site/src/css/shared.module.scss";
import Beach from "@site/static/img/beach.svg";
import {
  add,
  cssClassNames,
  ToastComponentProps,
  Toaster,
} from "@toastup/react";
import styles from "./examples.module.scss";

const CustomToast = (props: ToastComponentProps) => {
  return (
    <div
      ref={props.ref}
      className={`${cssClassNames.toast} ${styles.customToast}`}
    >
      <Beach className={styles.customToastImage} />
      {props.children}
    </div>
  );
};

export function CustomToastExample() {
  const handleClick = () =>
    add({
      toast: CustomToast,
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
