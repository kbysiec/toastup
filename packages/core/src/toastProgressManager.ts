import { toastQueue } from "./toastQueue";
import { ToastEntity } from "./types";

function togglePause(id: string, isPaused: boolean) {
  const toastMap = toastQueue.get();
  const toast = toastMap.get(id);

  if (!toast) return;
  toast.autoHideDetails.isPaused = isPaused;
}

export function pause(id: string) {
  togglePause(id, true);
}

export function unpause(id: string) {
  togglePause(id, false);
}

export const togglePauseIfExceedVisibleToastLimit = (toast: ToastEntity) => {
  toast.exceedVisibleToastsLimit ? pause(toast.id) : unpause(toast.id);
};
