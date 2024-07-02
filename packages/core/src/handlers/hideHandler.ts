import { register } from "../actionManager";
import { actionType } from "../constants";
import {
  assureToastsPosition,
  getToastsForReposition,
  getVisibleToastsWithSamePosition,
  repositionToasts,
  toggleToastsRepositionTransition,
} from "../toastPositionManager";
import { toastQueue } from "../toastQueue";
import {
  executeToastCallback,
  setToastVisibility,
  sleepForAnimationTime,
  toggleAnimation,
  updateToastsExceedingVisibleLimit,
} from "../toastUtils";
import { Action, HideAllPayload, HidePayload, ToastEntity } from "../types";
import { sleep } from "../utils";

export async function hideAllToastsImmediately(
  withAnimation: boolean,
  callback?: () => void
) {
  const toastMap = toastQueue.get();
  const toastArr = Array.from(toastMap.values());
  for (let i = 0; i < toastArr.length; i++) {
    const toast = toastArr[i];
    hideToastImmediately(toast, withAnimation);
    toastMap.delete(toast.id);
  }

  const highestSleep =
    toastArr.map(t => t.outAnimation.animationTime).sort()[0] || 0;

  withAnimation && (await sleep(highestSleep));
  callback && callback();
}

function hideToastImmediately(toast: ToastEntity, withAnimation: boolean) {
  executeToastCallback(toast, t => t.onHiding);
  withAnimation && toggleAnimation(toast, t => t.outAnimation, true);
  setToastVisibility(toast, false);
  clearInterval(toast.autoHideDetails?.intervalId);

  executeToastCallback(toast, t => t.onHide);
}

async function hideToast(toast: ToastEntity, withAnimation: boolean) {
  executeToastCallback(toast, t => t.onHiding);

  withAnimation && toggleAnimation(toast, t => t.outAnimation, true);
  await sleepForAnimationTime(toast.outAnimation);
  setToastVisibility(toast, false);
  clearInterval(toast.autoHideDetails?.intervalId);

  executeToastCallback(toast, t => t.onHide);
}

async function hideAndReposition(toast: ToastEntity, withAnimation: boolean) {
  const DELAY_AFTER_REPOSITION_IN_MS = 160;
  await hideToast(toast, withAnimation);

  const toastMap = toastQueue.get();
  const toasts = Array.from(toastMap.values());
  const toastsFromTheSameGroup = getToastsForReposition(
    toasts,
    toast,
    actionType.remove
  );

  const visibleToastsWithSamePosition = getVisibleToastsWithSamePosition(
    toasts,
    toast
  );
  visibleToastsWithSamePosition.sort((a, b) => a.index - b.index);
  updateToastsExceedingVisibleLimit(
    toast,
    visibleToastsWithSamePosition,
    actionType.remove
  );

  toggleToastsRepositionTransition(toastsFromTheSameGroup, true);
  repositionToasts(toastsFromTheSameGroup, toast, actionType.remove);
  await sleep(DELAY_AFTER_REPOSITION_IN_MS);
  toggleToastsRepositionTransition(toastsFromTheSameGroup, false);
}

export async function hide(
  toast: ToastEntity,
  withAnimation: boolean,
  callback?: () => void
) {
  const toastMap = toastQueue.get();
  await hideAndReposition(toast, withAnimation);
  const toasts = Array.from(toastMap.values());
  await assureToastsPosition(toast, toasts);
  toastMap.delete(toast.id);
  callback && callback();
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

export async function handleHideAllToasts(event: CustomEvent<HideAllPayload>) {
  const { withAnimation, callback } = event.detail;
  await hideAllToastsImmediately(withAnimation, callback);
}
