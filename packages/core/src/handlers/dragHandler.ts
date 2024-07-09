import { cssClassNames } from "../constants";
import { pauseInternal, unpauseInternal } from "../toastProgressManager";
import { toastQueue } from "../toastQueue";
import { updateToastTranslateAndOpacity } from "../toastUtils";
import { ToastEntity } from "../types";
import { sleep } from "../utils";

function getDragX(event: TouchEvent) {
  return event.targetTouches && event.targetTouches.length >= 1
    ? event.targetTouches[0].clientX
    : 0;
}

function getToastDragDelta(toast: ToastEntity) {
  return toast.dragDetails.x - toast.dragDetails.start;
}

function setToastOpacityOnDrag(toast: ToastEntity) {
  if (!toast.element?.style) return;

  toast.element.style.opacity = `${
    1 - Math.abs(toast.dragDetails.delta / toast.dragDetails.removalDistance)
  }`;
}

function ifDragDeltaIsGreaterThanRemovalDistance(toast: ToastEntity) {
  return Math.abs(toast.dragDetails.delta) > toast.dragDetails.removalDistance;
}

function updateDragDeltaForSmoothAnimation(toast: ToastEntity) {
  toast.dragDetails.delta = toast.dragDetails.delta * 1.3;
}

function resetToastDragState(toast: ToastEntity) {
  if (toast.element?.style) {
    toast.element.style.opacity = "";
  }
  updateToastTranslateAndOpacity(
    toast,
    toast.translate.x,
    toast.translate.y,
    false
  );
}

export function toggleToastDragTransition(
  toast: ToastEntity,
  duringDrag: boolean
) {
  toast.element?.classList.toggle(cssClassNames.toastDragging, duringDrag);
}

export function startDragging(event: TouchEvent, id: string) {
  pauseInternal(id);
  const toastMap = toastQueue.get();
  const toast = toastMap.get(id);

  if (!toast || !toast.element?.offsetWidth) return;

  toast.dragDetails.x = getDragX(event);
  toast.dragDetails.start = toast.dragDetails.x;
  toast.dragDetails.removalDistance =
    toast.element?.offsetWidth * (toast.removeOnDraggingPercent / 100);
  toast.dragDetails.shouldHandleDragMove = true;

  dragHandler.toggleToastDragTransition(toast, true);
}

export async function stopDragging(_event: TouchEvent, id: string) {
  const toastMap = toastQueue.get();
  const toast = toastMap.get(id);

  if (!toast) return;

  const shouldHandleDragEnd =
    toast.dragDetails.shouldHandleDragMove && toast.dragDetails.wasMoved;
  toast.dragDetails.shouldHandleDragMove = false;
  toast.dragDetails.wasMoved = false;

  if (shouldHandleDragEnd) {
    updateDragDeltaForSmoothAnimation(toast);
    updateToastTranslateAndOpacity(
      toast,
      toast.dragDetails.delta,
      toast.translate.y,
      false
    );
    setToastOpacityOnDrag(toast);
    await sleep(120);

    ifDragDeltaIsGreaterThanRemovalDistance(toast)
      ? toast.hide(false)
      : resetToastDragState(toast);
  }
  dragHandler.toggleToastDragTransition(toast, true);
  unpauseInternal(id);
}

export function duringDragging(event: TouchEvent, id: string) {
  const toastMap = toastQueue.get();
  const toast = toastMap.get(id);

  if (!toast || !toast.dragDetails.shouldHandleDragMove) return;

  toast.dragDetails.x = getDragX(event);
  toast.dragDetails.wasMoved = true;
  toast.dragDetails.delta = getToastDragDelta(toast);

  updateToastTranslateAndOpacity(
    toast,
    toast.dragDetails.delta,
    toast.translate.y,
    false
  );
  setToastOpacityOnDrag(toast);
}

export const dragHandler = {
  toggleToastDragTransition,
};
