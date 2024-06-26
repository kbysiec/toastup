import { slideVerticallyIn } from "./animations/inAnimation";
import { slideHorizontalWithFadeInBody } from "./animations/inBodyAnimation";
import { slideVerticallyOut } from "./animations/outAnimation";
import { displayOrder, events, position, theme, type } from "./constants";
import { eventManager } from "./eventManager";
import { handleAddedToast } from "./handlers/addHandler";
import { handleClickToast } from "./handlers/clickHandler";
import {
  duringDragging,
  startDragging,
  stopDragging,
} from "./handlers/dragHandler";
import {
  handleHideAllToasts,
  handleHideToast,
  hideAllToastsImmediately,
} from "./handlers/hideHandler";
import { handleMountedToast } from "./handlers/mountHandler";
import { handleShowToast } from "./handlers/showHandler";
import { toastQueue } from "./toastQueue";
import {
  ToastCallback,
  ToastConfig,
  ToastEntity,
  ToastOnlyProps,
  ToastProps,
  ToastPublicProps,
} from "./types";
import { uuid } from "./utils";

export function add<T extends ToastConfig>(overriddenConfig: Partial<T> = {}) {
  overriddenConfig.id = overriddenConfig.id ? overriddenConfig.id : uuid();
  const eventMgr = eventManager.get();
  eventMgr.emit(events.add, overriddenConfig);

  return overriddenConfig.id;
}

export function remove(id: string, callback?: () => void) {
  const eventMgr = eventManager.get();
  eventMgr.emit(events.hide, { toastId: id, withAnimation: true, callback });
}

export function removeAll(withAnimation = true, callback?: () => void) {
  const eventMgr = eventManager.get();
  withAnimation
    ? eventMgr.emit(events.removeAll, { withAnimation })
    : hideAllToastsImmediately(withAnimation, callback);
}

export function registerToastupEventHandlers() {
  const eventMgr = eventManager.get();

  const callbacks = {
    [events.added]: handleAddedToast,
    [events.mounted]: handleMountedToast,
    [events.show]: handleShowToast,
    [events.hide]: handleHideToast,
    [events.hideAll]: handleHideAllToasts,
    [events.click]: handleClickToast,
  };

  Object.keys(callbacks).forEach(key => {
    const ev = key as keyof typeof callbacks;
    const cb = callbacks[ev];
    eventMgr.on(ev, cb);
  });
}

function togglePause(id: string, isPaused: boolean) {
  const toastMap = toastQueue.get();
  const toast = toastMap.get(id);

  if (!toast) return;
  toast.autoHideDetails.isPaused = isPaused;
}

export function pause(id: string) {
  togglePause(id, true);
}

export function unpause(id: string) {
  togglePause(id, false);
}

export function getToastPropsForCreate(config: ToastConfig) {
  const commonProps: ToastOnlyProps = {
    element: null,
    uuid: uuid(),
    duringRemoval: false,
    isVisible: false,
    index: -1,
    dimensions: { height: -1, width: -1 },
    translate: { y: 0, x: 0 },
    pause: () => pause(config.id),
    unpause: () => unpause(config.id),
    startDragging: (event: TouchEvent) => startDragging(event, config.id),
    stopDragging: (event: TouchEvent) => stopDragging(event, config.id),
    duringDragging: (event: TouchEvent) => duringDragging(event, config.id),
    autoHideDetails: {
      isPaused: false,
      timeVisible: 0,
    },
    dragDetails: {
      start: 0,
      x: 0,
      delta: 0,
      removalDistance: 0,
      shouldHandleDragMove: false,
      isMouseOver: false,
      wasMoved: false,
    },
    exceedVisibleToastsLimit: false,
    visibleToasts: 5,
  };
  return commonProps;
}

export function getDefaultConfig() {
  const defaultConfig: ToastProps = {
    id: uuid(),
    message: "Awesome 🎉",
    title: type.base,
    position: position.bottomRight,
    type: type.base,
    order: displayOrder.normal,
    inAnimation: slideVerticallyIn,
    inBodyAnimation: slideHorizontalWithFadeInBody,
    outAnimation: slideVerticallyOut,
    hideOnClick: true,
    autoHide: 3000,
    delayBeforeShow: 0,
    showProgress: true,
    showIcon: true,
    showHideButton: true,
    iconClassName: "",
    hideButtonClassName: "",
    contentClassName: "",
    containerClassName: "",
    bodyClassName: "",
    progressBarClassName: "",
    className: "",
    role: "alert",
    iconStyle: {},
    hideButtonStyle: {},
    contentStyle: {},
    containerStyle: {},
    bodyStyle: {},
    progressBarStyle: {},
    style: {},
    animateBody: false,
    rtl: false,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    dragOnMobile: true,
    removeOnDraggingPercent: 70,
    theme: theme.light,
    onShowing: undefined,
    onHiding: undefined,
    onShow: undefined,
    onHide: undefined,
    onClick: undefined,
    // visibleToasts: 5,
  };

  return defaultConfig;
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
    // autoHideDetails: toast.autoHideDetails,
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
