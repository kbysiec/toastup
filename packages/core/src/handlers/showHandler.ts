import { register } from "../actionManager";
import {
  actionType,
  animationElementSelector,
  cssClassNames,
  displayOrder,
  measureType,
} from "../constants";
import { executeToastCallback } from "../toast";
import {
  assureToastsPosition,
  getToastsForReposition,
  getVisibleToastsWithSamePosition,
  repositionToasts,
  toggleToastsRepositionTransition,
} from "../toastPositionManager";
import { toastQueue } from "../toastQueue";
import {
  setToastVisibility,
  sleepForAnimationTime,
  toggleAnimation,
  togglePauseIfExceedVisibleToastLimit,
  updateToastTranslateAndOpacity,
  updateToastsExceedingVisibleLimit,
} from "../toastUtils";
import { Action, MeasureType, ToastEntity } from "../types";
import { getOuter, sleep } from "../utils";

function getToastWithHighestTranslateY(
  toasts: ToastEntity[],
  toast: ToastEntity
) {
  const toastWithHighestTranslateY = toasts.length
    ? toasts.reduce((prev: ToastEntity, current: ToastEntity) => {
        if (toast.position.includes("top")) {
          return prev.translate.y > current.translate.y ? prev : current;
        } else {
          return prev.translate.y < current.translate.y ? prev : current;
        }
      })
    : null;

  return toastWithHighestTranslateY;
}

export function getStartTranslateYForReversedOrder(
  toast: ToastEntity,
  toasts: ToastEntity[],
  sameAsLastToast = false
) {
  const toastWithBiggestTranslateY = getToastWithHighestTranslateY(
    toasts,
    toast
  );
  if (toastWithBiggestTranslateY) {
    const translateYAsLastToast = toastWithBiggestTranslateY.translate.y;
    const translateYForTopPosition =
      toastWithBiggestTranslateY.dimensions.height +
      toastWithBiggestTranslateY.translate.y;
    const translateYForBottomPosition =
      toastWithBiggestTranslateY.dimensions.height * -1 +
      toastWithBiggestTranslateY.translate.y;

    const translateY = sameAsLastToast
      ? translateYAsLastToast
      : toast.position.includes("top")
        ? translateYForTopPosition
        : translateYForBottomPosition;

    return translateY;
  }
  return toast.translate.y;
}

export async function animateBodyIfApplicable(toast: ToastEntity) {
  if (!toast.animateBody) return;

  toggleAnimation(
    toast,
    t => t.inBodyAnimation,
    true,
    animationElementSelector.body
  );
  await sleepForAnimationTime(toast.inBodyAnimation);
  toast.element
    ?.querySelector(animationElementSelector.body)
    ?.classList.toggle(`${cssClassNames.bodyVisible}`, true);
}

async function showToast(toast: ToastEntity) {
  executeToastCallback(toast, t => t.onShowing);
  toast.isVisible = true;
  toggleAnimation(toast, t => t.inAnimation, true);
  setToastVisibility(toast, true);
  executeToastCallback(toast, t => t.onShow);
  await sleepForAnimationTime(toast.inAnimation);
  await animateBodyIfApplicable(toast);
}

async function showAndRepositionNormalOrder(
  toast: ToastEntity,
  toasts: ToastEntity[]
) {
  const DELAY_AFTER_REPOSITION_IN_MS = 160;

  toggleToastsRepositionTransition(toasts, true);
  repositionToasts(toasts, toast, actionType.add);
  await sleep(DELAY_AFTER_REPOSITION_IN_MS);
  toast.delayBeforeShow && (await sleep(toast.delayBeforeShow));

  await showToast(toast);
  toggleAnimation(toast, t => t.inAnimation, false);
  toast.animateBody &&
    toggleAnimation(
      toast,
      t => t.inBodyAnimation,
      false,
      animationElementSelector.body
    );
  toggleToastsRepositionTransition(toasts, false);
}

async function showAndRepositionReversedOrder(
  toast: ToastEntity,
  toasts: ToastEntity[]
) {
  const translate = {
    x: toast.translate.x,
    y: toasts.length ? getStartTranslateYForReversedOrder(toast, toasts) : 0,
  };
  updateToastTranslateAndOpacity(toast, translate.x, translate.y);

  toast.delayBeforeShow && (await sleep(toast.delayBeforeShow));
  await showToast(toast);
  toggleAnimation(toast, t => t.inAnimation, false);
  toast.animateBody &&
    toggleAnimation(
      toast,
      t => t.inBodyAnimation,
      false,
      animationElementSelector.body
    );
}

async function showAndReposition(toast: ToastEntity) {
  setMeasure(toast, measureType.height);
  setMeasure(toast, measureType.width);
  const toastMap = toastQueue.get();
  const toasts = Array.from(toastMap.values());
  const toastsFromTheSameGroup = getToastsForReposition(
    toasts,
    toast,
    actionType.add
  );

  const visibleToastsWithSamePosition = getVisibleToastsWithSamePosition(
    toasts,
    toast
  );
  visibleToastsWithSamePosition.sort((a, b) => a.index - b.index);
  updateToastsExceedingVisibleLimit(
    toast,
    visibleToastsWithSamePosition,
    actionType.add
  );

  toast.order === displayOrder.normal
    ? await showAndRepositionNormalOrder(toast, toastsFromTheSameGroup)
    : await showAndRepositionReversedOrder(toast, toastsFromTheSameGroup);

  togglePauseIfExceedVisibleToastLimit(toast);
  setToastAutoHide(toast);
}

export async function show(toast: ToastEntity) {
  const toastMap = toastQueue.get();
  await showAndReposition(toast);
  const toasts = Array.from(toastMap.values());
  await assureToastsPosition(toast, toasts);
}

export async function handleShowToast(event: CustomEvent<ToastEntity>) {
  const toast = event.detail;

  const action: Action = {
    actionType: actionType.add,
    fn: show.bind(null, toast),
  };
  await register(action);
}

export function setMeasure(toast: ToastEntity, measure: MeasureType) {
  if (!toast.element || !toast.element) return;
  toast.dimensions = {
    ...toast.dimensions,
    [measure]: getOuter(toast.element, measure),
  };
}

function setToastProgress(toast: ToastEntity, value: number) {
  toast.element?.style.setProperty("--progressValue", `${value}`);
}

function isReadyForAutoHide(toast: ToastEntity) {
  return toast.autoHideDetails.timeVisible >= toast.autoHide;
}

function shouldRecalculateTimeVisible(toast: ToastEntity) {
  return !toast.autoHideDetails.isPaused;
}

function shouldSetProgress(toast: ToastEntity) {
  return (
    toast.showProgress &&
    typeof toast.autoHide === "number" &&
    !toast.autoHideDetails.isPaused
  );
}

function recalculateTimeVisible(
  toast: ToastEntity,
  currentTime: number,
  lastTime: number
) {
  toast.autoHideDetails.timeVisible += currentTime - lastTime;
}

export function setToastAutoHide(toast: ToastEntity) {
  if (!toast.autoHide) return;

  let lastTime = new Date().getTime();

  toast.autoHideDetails.intervalId = setInterval(() => {
    const currentTime = new Date().getTime();

    isReadyForAutoHide(toast) && toast.hide(true);

    shouldRecalculateTimeVisible(toast) &&
      recalculateTimeVisible(toast, currentTime, lastTime);

    shouldSetProgress(toast) &&
      setToastProgress(
        toast,
        toast.autoHideDetails.timeVisible / (toast.autoHide as number)
      );

    lastTime = currentTime;
  }, 16.6);
}
