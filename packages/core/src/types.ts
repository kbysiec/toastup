import CSS from "csstype";

import {
  actionType,
  animationElementSelector,
  animationType,
  displayOrder,
  events,
  measureType,
  position,
  theme,
  type,
} from "./constants";

declare global {
  interface DocumentEventMap {
    [events.add]: CustomEvent;
    [events.added]: CustomEvent;
    [events.remove]: CustomEvent;
    [events.mounted]: CustomEvent;
    [events.reactDidMount]: CustomEvent;
    [events.show]: CustomEvent;
    [events.hide]: CustomEvent;
    [events.click]: CustomEvent;
  }
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

const eventValues = Object.values(events).flat();
const positionValues = Object.values(position).flat();
const animationElementSelectorValues = Object.values(
  animationElementSelector
).flat();
const themeValues = Object.values(theme).flat();

export type EventType = (typeof eventValues)[number];
export type ToastPosition = (typeof positionValues)[number];
export type ToastTheme = (typeof themeValues)[number];
export type ActionType = keyof typeof actionType;
export type ToastType = keyof typeof type;
export type DisplayOrder = keyof typeof displayOrder;
export type AnimationType = keyof typeof animationType;
export type AnimationElementSelector =
  (typeof animationElementSelectorValues)[number];

export type MeasureType = keyof typeof measureType;

export interface Action {
  actionType: ActionType;
  fn: () => void;
}

interface AnimationBase {
  type: AnimationType;
  className?: string;
  animationName?: string;
  animationTime?: number;
}

interface InAnimationBase extends AnimationBase {
  type: "in";
}

export type ToastInAnimation = RequireOnlyOne<
  InAnimationBase,
  "className" | "animationName"
>;

export interface ToastOutAnimation extends AnimationBase {
  type: "out";
}

interface BodyAnimationBase extends AnimationBase {
  type: "body";
}

export type ToastInBodyAnimation = RequireOnlyOne<
  BodyAnimationBase,
  "className" | "animationName"
>;

export type ToastAnimation =
  | ToastInAnimation
  | ToastOutAnimation
  | ToastInBodyAnimation;

export interface PrivateToastConfig {
  id: string;
  message: string;
  title: string;
  position: ToastPosition;
  type: ToastType;
  order: DisplayOrder;
  inAnimation: ToastInAnimation;
  outAnimation: ToastOutAnimation;
  inBodyAnimation: ToastInBodyAnimation;
  hideOnClick: boolean;
  autoHide: number;
  delayBeforeShow: number;
  showProgress: boolean;
  showIcon: boolean;
  showHideButton: boolean;
  animateBody: boolean;
  rtl: boolean;
  pauseOnHover: boolean;
  pauseOnFocusLoss: boolean;
  dragOnMobile: boolean;
  removeOnDraggingPercent: number;
  theme: ToastTheme;
  iconClassName: string;
  hideButtonClassName: string;
  contentClassName: string;
  containerClassName: string;
  bodyClassName: string;
  progressBarClassName: string;
  className: string;
  role: string;
  iconStyle: CSS.Properties<string | number>;
  hideButtonStyle: CSS.Properties<string | number>;
  contentStyle: CSS.Properties<string | number>;
  containerStyle: CSS.Properties<string | number>;
  bodyStyle: CSS.Properties<string | number>;
  progressBarStyle: CSS.Properties<string | number>;
  style: CSS.Properties<string | number>;
  onShowing: ToastCallback;
  onHiding: ToastCallback;
  onShow: ToastCallback;
  onHide: ToastCallback;
  onClick: ToastCallback;
  visibleToasts: number;
}

export type ToastConfig = Omit<PrivateToastConfig, "visibleToasts">;

export interface ToastOnlyProps {
  element: HTMLElement | null;
  uuid: string;
  index: number;
  duringRemoval: boolean;
  isVisible: boolean;
  dimensions: { height: number; width: number };
  translate: { x: number; y: number };
  autoHideDetails: {
    intervalId?: NodeJS.Timeout | number;
    isPaused: boolean;
    timeVisible: number;
  };
  dragDetails: {
    start: number;
    x: number;
    delta: number;
    removalDistance: number;
    shouldHandleDragMove: boolean;
    isMouseOver: boolean;
    wasMoved: boolean;
  };
  pause: ToastPauseHandler;
  unpause: ToastPauseHandler;
  startDragging: ToastDragHandler;
  stopDragging: ToastDragHandler;
  duringDragging: ToastDragHandler;
  exceedVisibleToastsLimit: boolean;
}

export interface ComponentProps {
  className: string;
}

export interface ToastEntity
  extends PrivateToastConfig,
    ToastOnlyProps,
    ComponentProps {
  hide: ToastHideHandler;
}

export type ToastPauseHandler = () => void;
export type ToastHideHandler = (withAnimation?: boolean) => void;
export type ToastDragHandler = (
  event: TouchEvent
  // id: string
) => void | Promise<void>;
export type ToastCallback = ((props: ToastPublicProps) => void) | undefined;
export type EventCallback = (event: CustomEvent) => void;

const toastPrivateProps = [
  "element",
  "index",
  "uuid",
  "duringRemoval",
  "autoHideDetails",
  "hide",
  "pause",
  "unpause",
  "startDragging",
  "stopDragging",
  "duringDragging",
  "onShowing",
  "onHiding",
  "onShow",
  "onHide",
  "onClick",
  "icon",
  "hideButton",
  "content",
  "body",
  "toast",
  // "isOverloadingStack",
  // "overloadingStackMaxNumber",
] as const;

export type ToastPublicProps = Omit<
  ToastEntity,
  (typeof toastPrivateProps)[number]
>;

export type HidePayload = {
  toastId: string;
  withAnimation: boolean;
  callback: () => void;
};
export type RemovePayload = {
  toastId: string;
  withAnimation: boolean;
};

export type Payload =
  | Partial<PrivateToastConfig>
  | ToastEntity
  | RemovePayload
  | HidePayload
  | string;

const toastOnlyConfigProps = ["id"] as const;
interface ToasterOnlyConfig {
  visibleToasts?: number;
}

export type ToasterConfig = Partial<
  Omit<PrivateToastConfig, (typeof toastOnlyConfigProps)[number]>
> &
  ToasterOnlyConfig;
