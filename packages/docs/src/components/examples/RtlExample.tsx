import sharedStyles from "@site/src/css/shared.module.scss";
import { add, Toaster } from "@toastup/react";

export function RtlExample() {
  const handleClick = () => add({ rtl: true });
  return (
    <div>
      <button className={sharedStyles.buttonPrimary} onClick={handleClick}>
        Add toast
      </button>
      <Toaster />
    </div>
  );
}
