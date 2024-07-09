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
import { pauseInternal, unpauseInternal } from "./toastProgressManager";
import { ToastConfig, ToastOnlyProps, ToastProps } from "./types";
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

export function getToastPropsForCreate(config: ToastConfig) {
  const commonProps: ToastOnlyProps = {
    element: null,
    uuid: uuid(),
    duringRemoval: false,
    isVisible: false,
    index: -1,
    dimensions: { height: -1, width: -1 },
    translate: { y: 0, x: 0 },
    pause: () => pauseInternal(config.id),
    unpause: () => unpauseInternal(config.id),
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
  };
  return commonProps;
}

export function getDefaultConfig() {
  const defaultConfig: ToastProps = {
    id: uuid(),
    message: "Have a good day 🙂",
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
    visibleToasts: 0,
    onShowing: undefined,
    onHiding: undefined,
    onShow: undefined,
    onHide: undefined,
    onClick: undefined,
  };

  return defaultConfig;
}
