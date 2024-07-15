import sharedStyles from "@site/src/css/shared.module.scss";
import { toast, Toaster } from "@toastup/react";
import { useEffect } from "react";
import styles from "./examples.module.scss";

export function StylingExample() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--toastup-background-color-base", "#d7fc03");
    root.style.setProperty("--toastup-title-color-base", "#000");
    root.style.setProperty("--toastup-icon-color-base", "#000");
    root.style.setProperty("--toastup-border-color-base", "#000");
    root.style.setProperty("--toastup-progress-bar-base", "#000");
    root.style.setProperty(
      "--toastup-progress-bar-progress-overlay-base",
      "#f6ffbf"
    );
  }, []);

  const handleClick = () => toast.add();
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
