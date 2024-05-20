import { register } from "@/actionManager";
import { actionType } from "@/constants";
import { executeToastCallback } from "@/toast";
import {
  assureToastsPosition,
  getToastsForReposition,
  repositionToasts,
  toggleToastsRepositionTransition,
} from "@/toastPositionManager";
import { toastQueue } from "@/toastQueue";
import {
  setToastVisibility,
  sleepForAnimationTime,
  toggleAnimation,
} from "@/toastUtils";
import { Action, HidePayload, ToastEntity } from "@/types";
import { sleep } from "@/utils";

async function hideToast(toast: ToastEntity, withAnimation: boolean) {
  executeToastCallback(toast, t => t.onHiding);

  withAnimation && toggleAnimation(toast, t => t.outAnimation, true);
  await sleepForAnimationTime(toast.outAnimation);
  setToastVisibility(toast, false);
  clearInterval(toast.autoHideDetails?.intervalId);

  executeToastCallback(toast, t => t.onHide);
}

async function hideAndReposition(toast: ToastEntity, withAnimation: boolean) {
  const delayAfterRepositionInMs = 200;
  await hideToast(toast, withAnimation);

  const toastMap = toastQueue.get();
  const toasts = Array.from(toastMap.values());
  const toastsFromTheSameGroup = getToastsForReposition(
    toasts,
    toast,
    actionType.remove
  );

  toggleToastsRepositionTransition(toastsFromTheSameGroup, true);
  repositionToasts(toastsFromTheSameGroup, toast, actionType.remove);
  await sleep(delayAfterRepositionInMs);
  toggleToastsRepositionTransition(toastsFromTheSameGroup, false);
}

export async function hide(
  toast: ToastEntity,
  withAnimation: boolean,
  callback: () => void
) {
  const toastMap = toastQueue.get();
  await hideAndReposition(toast, withAnimation);
  const toasts = Array.from(toastMap.values());
  await assureToastsPosition(toast, toasts);
  toastMap.delete(toast.id);
  callback();
}

export async function handleHideToast(event: CustomEvent<HidePayload>) {
  const toastMap = toastQueue.get();
  const { toastId, withAnimation, callback } = event.detail;
  const toast = toastMap.get(toastId);

  if (!toast || toast.duringRemoval) return;

  toast.duringRemoval = true;
  const action: Action = {
    actionType: actionType.remove,
    fn: hide.bind(null, toast, withAnimation, callback),
  };
  await register(action);
}
