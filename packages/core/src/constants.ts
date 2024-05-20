export const events = {
  reactDidMount: "toastup:react_did_mount_toast",
  add: "toastup:add",
  added: "toastup:added",
  remove: "toastup:remove",
  mounted: "toastup:mounted",
  show: "toastup:show",
  hide: "toastup:hide",
  click: "toastup:click",
} as const;

export const type = {
  base: "base",
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
} as const;

export const position = {
  topLeft: "top-left",
  topCenter: "top-center",
  topRight: "top-right",
  bottomLeft: "bottom-left",
  bottomCenter: "bottom-center",
  bottomRight: "bottom-right",
} as const;

export const actionType = {
  add: "add",
  remove: "remove",
} as const;

export const displayOrder = {
  normal: "normal",
  reversed: "reversed",
} as const;

export const animationType = {
  in: "in",
  out: "out",
  body: "body",
} as const;

const cssNamespace = "toastup";
export const cssClassNames = {
  toaster: `${cssNamespace}__toaster`,
  toast: `${cssNamespace}__toast`,
  toastDefault: `${cssNamespace}__toast--default`,
  toastVisible: `${cssNamespace}__toast--visible`,
  container: `${cssNamespace}__toast-container`,
  containerVisible: `${cssNamespace}__toast-container--visible`,
  body: `${cssNamespace}__toast-body`,
  bodyVisible: `${cssNamespace}__toast-body--visible`,
  bodyInvisible: `${cssNamespace}__toast-body--invisible`,
  content: `${cssNamespace}__toast-content`,
  toastTitle: `${cssNamespace}__toast-title`,
  toastMessage: `${cssNamespace}__toast-message`,
  toastIcon: `${cssNamespace}__toast-icon`,
  toastIconFill: `${cssNamespace}__toast-icon--fill`,
  toastIconStroke: `${cssNamespace}__toast-icon--stroke`,
  toastHideButton: `${cssNamespace}__toast-hide-button`,
  toastProgressBar: `${cssNamespace}__toast-progress-bar`,
  toastProgressBarForeground: `${cssNamespace}__toast-progress-bar-foreground`,
  toastProgressBarProgressOverlay: `${cssNamespace}__toast-progress-bar-progress-overlay`,
  toastType: {
    base: `${cssNamespace}__toast-type--base`,
    info: `${cssNamespace}__toast-type--info`,
    warning: `${cssNamespace}__toast-type--warning`,
    success: `${cssNamespace}__toast-type--success`,
    error: `${cssNamespace}__toast-type--error`,
  },
  toastRepositioning: `${cssNamespace}__toast--repositioning`,
  toastQuickRepositioning: `${cssNamespace}__toast--quick-repositioning`,
  toastDragging: `${cssNamespace}__toast--dragging`,
  toastRtl: `${cssNamespace}__toast--rtl`,
  toastThemeLight: `${cssNamespace}__toast-theme--light`,
  toastThemeDark: `${cssNamespace}__toast-theme--dark`,
  toastThemeColorful: `${cssNamespace}__toast-theme--colorful`,
} as const;

export const theme = {
  light: "",
  dark: cssClassNames.toastThemeDark,
  colorful: cssClassNames.toastThemeColorful,
} as const;

export const measureType = {
  width: "width",
  height: "height",
} as const;

export const animationElementSelector = {
  container: `[data-component="container"]`,
  body: `[data-component="body"]`,
} as const;
