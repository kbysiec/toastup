import { toastQueue } from "../toastQueue";
import { executeToastCallback } from "../toastUtils";

export function handleClickToast(event: CustomEvent<string>) {
  const toastId = event.detail;
  const toastMap = toastQueue.get();
  const toast = toastMap.get(toastId);

  toast && executeToastCallback(toast, t => t.onClick);
}
