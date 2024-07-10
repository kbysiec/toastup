import "@toastup/core/style";

import {
  actionType,
  add,
  animationElementSelector,
  animationType,
  bounceHorizontallyIn,
  bounceHorizontallyOut,
  cssClassNames,
  displayOrder,
  events,
  fadeIn,
  fadeOut,
  getCoalesced,
  getOuter,
  getTransformOtherThan,
  groupBy,
  isFunction,
  isHTMLElement,
  measureType,
  pause,
  position,
  remove,
  removeAll,
  singleBounceHorizontallyIn,
  singleBounceHorizontallyOut,
  singleBounceVerticallyIn,
  singleBounceVerticallyOut,
  sleep,
  slideHorizontallyIn,
  slideHorizontallyOut,
  slideHorizontalWithFadeInBody,
  slideVerticallyIn,
  slideVerticallyOut,
  slideVerticallyWithFadeInBody,
  theme,
  type,
  unpause,
  uuid,
  zoomIn,
  zoomInBody,
  zoomOut,
  zoomWithBounceIn,
  zoomWithBounceOut,
} from "@toastup/core";
import { Body } from "./components/Body";
import { Container } from "./components/Container";
import { Content } from "./components/Content";
import { HideButton } from "./components/HideButton";
import { Icon } from "./components/Icon";
import { ProgressBar } from "./components/ProgressBar";
import { Toast } from "./components/Toast";
import { Toaster } from "./components/Toaster";
import { ReactToastConfig } from "./reactTypes";

import type * as types from "@toastup/core";

import { reactEvents } from "./constants";
export * from "./reactTypes";
export { types };

const toast = {
  add: add<ReactToastConfig>,
  remove,
  removeAll,
  pause,
  unpause,
};

const animation = {
  body: {
    slideHorizontalWithFadeInBody,
    slideVerticallyWithFadeInBody,
    zoomInBody,
  },
  in: {
    fadeIn,
    zoomIn,
    zoomWithBounceIn,
    slideVerticallyIn,
    slideHorizontallyIn,
    bounceHorizontallyIn,
    singleBounceHorizontallyIn,
    singleBounceVerticallyIn,
  },
  out: {
    fadeOut,
    zoomOut,
    zoomWithBounceOut,
    slideVerticallyOut,
    slideHorizontallyOut,
    bounceHorizontallyOut,
    singleBounceHorizontallyOut,
    singleBounceVerticallyOut,
  },
};

export {
  actionType,
  animation,
  animationElementSelector,
  animationType,
  Body,
  Container,
  Content,
  cssClassNames,
  displayOrder,
  events,
  getCoalesced,
  getOuter,
  getTransformOtherThan,
  groupBy,
  HideButton,
  Icon,
  isFunction,
  isHTMLElement,
  measureType,
  position,
  ProgressBar,
  reactEvents,
  sleep,
  theme,
  toast,
  Toast,
  Toaster,
  type,
  uuid,
};
