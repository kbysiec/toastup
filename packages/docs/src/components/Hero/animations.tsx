import {
  bounceHorizontallyIn,
  bounceHorizontallyOut,
  fadeIn,
  fadeOut,
  singleBounceHorizontallyIn,
  singleBounceHorizontallyOut,
  singleBounceVerticallyIn,
  singleBounceVerticallyOut,
  slideHorizontalWithFadeInBody,
  slideHorizontallyIn,
  slideHorizontallyOut,
  slideVerticallyIn,
  slideVerticallyOut,
  slideVerticallyWithFadeInBody,
  zoomIn,
  zoomInBody,
  zoomOut,
  zoomWithBounceIn,
  zoomWithBounceOut,
} from "@toastup/react";

export const inAnimation = {
  fade: {
    name: "fade",
    animation: fadeIn,
  },
  zoom: {
    name: "zoom",
    animation: zoomIn,
  },
  "zoom with bounce": {
    name: "zoom with bounce",
    animation: zoomWithBounceIn,
  },
  "slide vertically": {
    name: "slide vertically",
    animation: slideVerticallyIn,
  },
  "slide horizontally": {
    name: "slide horizontally",
    animation: slideHorizontallyIn,
  },
  "bounce horizontally": {
    name: "bounce horizontally",
    animation: bounceHorizontallyIn,
  },
  "single bounce horizontally": {
    name: "single bounce horizontally",
    animation: singleBounceHorizontallyIn,
  },
  "single bounce vertically": {
    name: "single bounce vertically",
    animation: singleBounceVerticallyIn,
  },
} as const;

export type InAnimation = keyof typeof inAnimation;

export const outAnimation = {
  fade: {
    name: "fade",
    animation: fadeOut,
  },
  zoom: {
    name: "zoom",
    animation: zoomOut,
  },
  "zoom with bounce": {
    name: "zoom with bounce",
    animation: zoomWithBounceOut,
  },
  "slide vertically": {
    name: "slide vertically",
    animation: slideVerticallyOut,
  },
  "slide horizontally": {
    name: "slide horizontally",
    animation: slideHorizontallyOut,
  },
  "bounce horizontally": {
    name: "bounce horizontally",
    animation: bounceHorizontallyOut,
  },
  "single bounce horizontally": {
    name: "single bounce horizontally",
    animation: singleBounceHorizontallyOut,
  },
  "single bounce vertically": {
    name: "single bounce vertically",
    animation: singleBounceVerticallyOut,
  },
} as const;
export type OutAnimation = keyof typeof outAnimation;

export const inBodyAnimation = {
  zoom: {
    name: "zoom",
    animation: zoomInBody,
  },
  "slide horizontally with fade": {
    name: "slide horizontally with fade",
    animation: slideHorizontalWithFadeInBody,
  },
  "slide vertically with fade": {
    name: "slide vertically with fade",
    animation: slideVerticallyWithFadeInBody,
  },
} as const;
export type InBodyAnimation = keyof typeof inBodyAnimation;
