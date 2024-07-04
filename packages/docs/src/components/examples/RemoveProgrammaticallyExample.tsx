import sharedStyles from "@site/src/css/shared.module.scss";
import { add, remove, removeAll, Toaster } from "@toastup/react";
import { useState } from "react";

export function RemoveProgrammaticallyExample() {
  const [ids, setIds] = useState<string[]>([]);

  const handleAddClick = () => {
    const id = add({ autoHide: 20000});
    setIds(ids => [...ids, id]);
  };
  const handleRemoveClick = () => remove(ids.pop());
  const handleRemoveAllClick = () => {
    removeAll();
    setIds([]);
  };
  return (
    <div>
      <button className={sharedStyles.buttonPrimary} onClick={handleAddClick}>
        Add toast
      </button>
      <button className={sharedStyles.buttonSecondary} onClick={handleRemoveClick}>
        Remove last toast
      </button>
      <button className={sharedStyles.buttonSecondary} onClick={handleRemoveAllClick}>
        Remove all toasts
      </button>
      <Toaster />
    </div>
  );
}
