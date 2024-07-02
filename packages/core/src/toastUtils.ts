import {
  actionType,
  animationElementSelector,
  cssClassNames,
} from "./constants";
import {
  ActionType,
  AnimationElementSelector,
  ToastAnimation,
  ToastCallback,
  ToastEntity,
  ToastPublicProps,
} from "./types";
import { getTransformOtherThan, sleep } from "./utils";

export const updateToastTranslateAndOpacity = (
  toast: ToastEntity,
  translateXValue: number,
  translateYValue: number,
  withStyle = true
) => {
  updateToastOpacity(toast);
  updateToastTranslate(toast, translateXValue, translateYValue, withStyle);
};

const updateToastOpacity = (toast: ToastEntity) => {
  if (!toast.element || !toast.element) return;

  toast.element.style.setProperty(
    "opacity",
    toast.exceedVisibleToastsLimit ? "0" : "",
    "important"
  );
  toast.element.style.setProperty(
    "pointer-events",
    toast.exceedVisibleToastsLimit ? "none" : "",
    "important"
  );
};

const updateToastTranslate = (
  toast: ToastEntity,
  translateXValue: number,
  translateYValue: number,
  withStyle = true
) => {
  if (!toast.element || !toast.element) return;

  if (withStyle) {
    toast.translate = {
      x: translateXValue,
      y: translateYValue,
    };
  }

  const transformOtherThanTranslate = getTransformOtherThan(
    toast.element,
    "translate"
  );

  toast.element.style.setProperty(
    "transform",
    `translate(${translateXValue}px, ${translateYValue}px)${
      transformOtherThanTranslate ? ` ${transformOtherThanTranslate}` : ""
    }`
  );
  toast.element.style.setProperty(
    "opacity",
    toast.exceedVisibleToastsLimit ? "0" : "",
    "important"
  );
  toast.element.style.setProperty(
    "pointer-events",
    toast.exceedVisibleToastsLimit ? "none" : "",
    "important"
  );
};

export function toggleAnimation<T extends ToastAnimation>(
  toast: ToastEntity,
  getAnimation: (toast: ToastEntity) => T,
  flag: boolean,
  elementSelector: AnimationElementSelector = animationElementSelector.container
) {
  const animation = getAnimation(toast);
  const element =
    elementSelector === animationElementSelector.container
      ? toast.element
      : (toast.element?.querySelector(elementSelector) as HTMLElement);

  if (
    animation.animationName &&
    animation.animationTime &&
    toast.element &&
    element
  ) {
    const props = {
      "--startTranslateX": {
        true: `${toast.translate.x}px`,
        false: "",
      },
      "--startTranslateY": {
        true: `${toast.translate.y}px`,
        false: "",
      },
      "--verticalPositionMultiplier": {
        true: `${toast.position.includes("top") ? -1 : 1}`,
        false: "",
      },
      "--horizontalPositionMultiplier": {
        true: `${toast.position.includes("left") ? -1 : 1}`,
        false: "",
      },
    } as const;

    Object.keys(props).forEach(key => {
      const value = props[key as keyof typeof props];
      flag
        ? toast.element?.style.setProperty(key, value.true)
        : toast.element?.style.setProperty(key, value.false);
    });

    element.style.animationName = flag ? animation.animationName : "";
    element.style.animationDuration = flag
      ? `${animation.animationTime}ms`
      : "";
    element.style.animationFillMode = flag ? "forwards" : "";
    element.style.animationTimingFunction = flag ? "linear" : "";
    element.style.animationIterationCount = flag ? "1" : "";
  } else if (animation.className && animation.animationTime && toast.element) {
    const container = toast.element?.querySelector(
      elementSelector
    ) as HTMLElement;

    animation.className &&
      animation.className
        .split(" ")
        .forEach(c => container?.classList.toggle(c, flag));
  }
}

export async function sleepForAnimationTime(animation: ToastAnimation) {
  animation.animationTime && (await sleep(animation.animationTime));
}

export function setToastVisibility(toast: ToastEntity, isVisible: boolean) {
  if (!toast.element || !toast.element) return;

  toast.isVisible = isVisible;
  toast.element.classList.toggle(`${cssClassNames.toastVisible}`, isVisible);
}

export function updateToastsExceedingVisibleLimit(
  toast: ToastEntity,
  toasts: ToastEntity[],
  actType: ActionType
) {
  const toastsArr = actType === actionType.add ? [toast, ...toasts] : toasts;
  toastsArr.sort((a, b) => a.index - b.index);

  toastsArr.forEach(
    (t, i) =>
      (t.exceedVisibleToastsLimit = toast.visibleToasts
        ? toast.visibleToasts <= i
        : false)
  );
}

function getPublicProps(toast: ToastEntity) {
  const props: ToastPublicProps = {
    id: toast.id,
    isVisible: toast.isVisible,
    title: toast.title,
    message: toast.message,
    position: toast.position,
    type: toast.type,
    order: toast.order,
    dimensions: { ...toast.dimensions },
    translate: { ...toast.translate },
    inAnimation: toast.inAnimation,
    outAnimation: toast.outAnimation,
    inBodyAnimation: toast.inBodyAnimation,
    hideOnClick: toast.hideOnClick,
    autoHide: toast.autoHide,
    delayBeforeShow: toast.delayBeforeShow,
    showProgress: toast.showProgress,
    showIcon: toast.showIcon,
    showHideButton: toast.showHideButton,
    iconClassName: toast.iconClassName,
    hideButtonClassName: toast.hideButtonClassName,
    contentClassName: toast.contentClassName,
    containerClassName: toast.containerClassName,
    bodyClassName: toast.bodyClassName,
    progressBarClassName: toast.progressBarClassName,
    className: toast.className,
    role: toast.role,
    iconStyle: toast.iconStyle,
    hideButtonStyle: toast.hideButtonStyle,
    contentStyle: toast.contentStyle,
    containerStyle: toast.containerStyle,
    bodyStyle: toast.bodyStyle,
    progressBarStyle: toast.progressBarStyle,
    style: toast.style,
    animateBody: toast.animateBody,
    rtl: toast.rtl,
    pauseOnHover: toast.pauseOnHover,
    pauseOnFocusLoss: toast.pauseOnFocusLoss,
    dragOnMobile: toast.dragOnMobile,
    removeOnDraggingPercent: toast.removeOnDraggingPercent,
    dragDetails: { ...toast.dragDetails },
    theme: toast.theme,
  };
  return props;
}

export function executeToastCallback<T extends ToastCallback>(
  toast: ToastEntity,
  getCallback: (toast: ToastEntity) => T
) {
  const callback = getCallback(toast);
  const props = getPublicProps(toast);
  callback && callback(props);
}
