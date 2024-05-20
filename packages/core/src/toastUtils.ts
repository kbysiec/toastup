import { animationElementSelector, cssClassNames } from "@/constants";
import { AnimationElementSelector, ToastAnimation, ToastEntity } from "@/types";
import { getTransformOtherThan, sleep } from "@/utils";

export const updateToastTranslate = (
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

  toast.element.style.transform = `translate(${translateXValue}px, ${translateYValue}px)${
    transformOtherThanTranslate ? ` ${transformOtherThanTranslate}` : ""
  }`;
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
  // const containerEl = toast.element.querySelector(
  //   animationElementSelector.container
  // );
  // if (!containerEl) return;

  toast.isVisible = isVisible;

  // containerEl.classList.toggle(`${cssClassNames.containerVisible}`, isVisible);
  toast.element.classList.toggle(`${cssClassNames.toastVisible}`, isVisible);
}
