import { toastQueue } from "./toastQueue";
import { ToastEntity } from "./types";

function togglePause(id: string, isPaused: boolean) {
  const toastMap = toastQueue.get();
  const toast = toastMap.get(id);

  if (!toast) return;
  toast.autoHideDetails.isPaused = isPaused;
}

export function pauseInternal(id: string) {
  togglePause(id, true);
}

export function unpauseInternal(id: string) {
  togglePause(id, false);
}

export const togglePauseIfExceedVisibleToastLimit = (toast: ToastEntity) => {
  toast.exceedVisibleToastsLimit
    ? pauseInternal(toast.id)
    : unpauseInternal(toast.id);
};
