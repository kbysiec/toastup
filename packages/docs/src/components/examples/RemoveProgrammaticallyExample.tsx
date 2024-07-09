import sharedStyles from "@site/src/css/shared.module.scss";
import { add, remove, removeAll, Toaster } from "@toastup/react";
import { useState } from "react";
import styles from "./examples.module.scss";

export function RemoveProgrammaticallyExample() {
  const [ids, setIds] = useState<string[]>([]);

  const handleAddClick = () => {
    const id = add({ autoHide: 20000 });
    setIds(ids => [...ids, id]);
  };
  const handleRemoveClick = () => remove(ids.pop());
  const handleRemoveAllClick = () => {
    removeAll();
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
      <div className={styles.removeButtons}>
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
