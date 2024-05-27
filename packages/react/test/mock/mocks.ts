import {
  ToastEntity,
  displayOrder,
  position,
  slideHorizontalWithFadeInBody,
  slideVerticallyIn,
  slideVerticallyOut,
  theme,
  type,
} from "@toastup/core";

export const toastBase: ToastEntity = {
  id: "123",
  uuid: "123",
  element: null,
  duringRemoval: false,
  isVisible: false,
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
  animateBody: false,
  rtl: false,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  dragOnMobile: true,
  removeOnDraggingPercent: 70,
  theme: theme.light,
  iconStyle: {},
  hideButtonStyle: {},
  contentStyle: {},
  containerStyle: {},
  bodyStyle: {},
  progressBarStyle: {},
  style: {},
  role: "alert",
  onShowing: undefined,
  onHiding: undefined,
  onShow: undefined,
  onHide: undefined,
  onClick: undefined,
  index: -1,
  dimensions: { height: -1, width: -1 },
  translate: { y: 0, x: 0 },
  hide: () => {},
  pause: () => {},
  unpause: () => {},
  startDragging: () => {},
  stopDragging: () => {},
  duringDragging: () => {},
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
};