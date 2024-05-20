import { cssClassNames, events } from "@/constants";
import { eventManager } from "@/eventManager";
import { reindexToastsForPosition } from "@/toastPositionManager";
import { toastQueue, update } from "@/toastQueue";
import { ToastEntity } from "@/types";

function addNecessaryClassName(toast: ToastEntity) {
  toast.element && toast.element.classList.add(cssClassNames.toast);
}

export function handleMountedToast(event: CustomEvent<ToastEntity>) {
  const toastMap = toastQueue.get();
  const mountedToast = event.detail;
  const toast = toastMap.get(mountedToast.id);

  if (toast?.element) return;

  addNecessaryClassName(mountedToast);

  update(mountedToast);
  const toasts = Array.from(toastMap.values());
  reindexToastsForPosition(mountedToast, toasts);
  eventManager.emit(events.show, mountedToast);
}
