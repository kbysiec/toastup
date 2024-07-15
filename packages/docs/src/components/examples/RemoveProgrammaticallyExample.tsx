import sharedStyles from "@site/src/css/shared.module.scss";
import { toast, Toaster } from "@toastup/react";
import { useState } from "react";
import styles from "./examples.module.scss";

export function RemoveProgrammaticallyExample() {
  const [ids, setIds] = useState<string[]>([]);

  const handleAddClick = () => {
    const id = toast.add({ autoHide: 20000 });
    setIds(ids => [...ids, id]);
  };
  const handleRemoveClick = () => toast.remove({ toastId: ids.pop() });
  const handleRemoveAllClick = () => {
    toast.remove();
    setIds([]);
  };
  return (
    <div>
      <button
        className={`${sharedStyles.buttonPrimary} ${styles.button}`}
        onClick={handleAddClick}
      >
        Add toast
      </button>
      <div className={styles.buttonsRow}>
        <button
          className={`${sharedStyles.buttonSecondary} ${styles.button}`}
          onClick={handleRemoveClick}
        >
          Remove last
        </button>
        <button
          className={`${sharedStyles.buttonSecondary} ${styles.button}`}
          onClick={handleRemoveAllClick}
        >
          Remove all
        </button>
      </div>
      <Toaster />
    </div>
  );
}
