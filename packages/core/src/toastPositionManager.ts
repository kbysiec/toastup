import { actionType, cssClassNames, displayOrder } from "@/constants";
import { updateToastTranslate } from "@/toastUtils";
import { ActionType, ToastEntity } from "@/types";
import { sleep } from "@/utils";

function repositionToast(
  toast: ToastEntity,
  touchedToast: ToastEntity,
  type: ActionType
) {
  const typeMultiplier = type === actionType.add ? 1 : -1;

  const translateYOffset = toast.position.includes("top")
    ? touchedToast.dimensions.height * typeMultiplier
    : touchedToast.dimensions.height * -1 * typeMultiplier;
  const translateY = toast.translate.y + translateYOffset;

  updateToastTranslate(toast, toast.translate.x, translateY);
}

export function repositionToasts(
  toasts: ToastEntity[],
  toast: ToastEntity,
  actType: ActionType
) {
  toasts.forEach(t => repositionToast(t, toast, actType));
}

function setToastIndex(toast: ToastEntity, toasts: ToastEntity[]) {
  if (toast.order !== displayOrder.reversed) return;
  toast.index = toasts.length;
}

function incrementToastsIndexByOne(toasts: ToastEntity[]) {
  toasts.forEach(toast => (toast.index = toast.index + 1));
}

function getToastsForReindex(toasts: ToastEntity[], toast: ToastEntity) {
  return toasts.filter(t => toast.position === t.position && toast.id !== t.id);
}

export function reindexToastsForPosition(
  toast: ToastEntity,
  toasts: ToastEntity[]
) {
  setToastIndex(toast, toasts);
  const toastsForReindex = getToastsForReindex(toasts, toast);
  toast.order === displayOrder.normal &&
    incrementToastsIndexByOne(toastsForReindex);
  toasts.sort((a, b) => a.index - b.index);
  let newIndex = toast.order === displayOrder.normal ? toast.index + 1 : 0;
  toasts.forEach(t => (t.index = newIndex++));
}

export function toggleToastsRepositionTransition(
  toasts: ToastEntity[],
  duringReposition: boolean,
  quickReposition = false
) {
  toasts.forEach(toast => {
    toast.element?.classList.toggle(
      quickReposition
        ? cssClassNames.toastQuickRepositioning
        : cssClassNames.toastRepositioning,
      duringReposition
    );
  });
}

function shouldBeRepositionedOnAdd(
  addedToast: ToastEntity,
  toast: ToastEntity
) {
  return (
    toast.isVisible &&
    toast.position === addedToast.position &&
    toast.id !== addedToast.id
  );
}

function shouldBeRepositionedOnRemove(
  removedToast: ToastEntity,
  toast: ToastEntity
) {
  return (
    toast.isVisible &&
    toast.position === removedToast.position &&
    toast.index >= removedToast.index
  );
}

export function getToastsForReposition(
  toasts: ToastEntity[],
  toast: ToastEntity,
  actType: ActionType
) {
  return toasts.filter(t =>
    actType === actionType.add
      ? shouldBeRepositionedOnAdd(toast, t)
      : shouldBeRepositionedOnRemove(toast, t)
  );
}

function getToastsForAssurePosition(toasts: ToastEntity[], toast: ToastEntity) {
  return toasts.filter(t => t.isVisible && toast.position === t.position);
}

function assureToastPosition(
  toast: ToastEntity,
  index: number,
  toasts: ToastEntity[]
) {
  const prev = toasts[index - 1];
  let translateY = 0;
  if (prev) {
    translateY = toast.position.includes("top")
      ? prev.translate.y + prev.dimensions.height
      : prev.translate.y + prev.dimensions.height * -1;
  }
  updateToastTranslate(toast, toast.translate.x, translateY);
}

export async function assureToastsPosition(
  toast: ToastEntity,
  toasts: ToastEntity[]
) {
  const delayAfterRepositionInMs = 150;
  const toastsForPosition = getToastsForAssurePosition(toasts, toast);
  toastsForPosition.sort((a, b) => a.index - b.index);

  toggleToastsRepositionTransition(toastsForPosition, true, true);
  toastsForPosition.forEach((t, i) =>
    assureToastPosition(t, i, toastsForPosition)
  );
  await sleep(delayAfterRepositionInMs);
  toggleToastsRepositionTransition(toastsForPosition, false, true);
}
