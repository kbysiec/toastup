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
    techName: "fadeIn",
    animation: fadeIn,
  },
  zoom: {
    name: "zoom",
    techName: "zoomIn",
    animation: zoomIn,
  },
  "zoom with bounce": {
    name: "zoom with bounce",
    techName: "zoomWithBounceIn",
    animation: zoomWithBounceIn,
  },
  "slide vertically": {
    name: "slide vertically",
    techName: "slideVerticallyIn",
    animation: slideVerticallyIn,
  },
  "slide horizontally": {
    name: "slide horizontally",
    techName: "slideHorizontallyIn",
    animation: slideHorizontallyIn,
  },
  "bounce horizontally": {
    name: "bounce horizontally",
    techName: "bounceHorizontallyIn",
    animation: bounceHorizontallyIn,
  },
  "single bounce horizontally": {
    name: "single bounce horizontally",
    techName: "singleBounceHorizontallyIn",
    animation: singleBounceHorizontallyIn,
  },
  "single bounce vertically": {
    name: "single bounce vertically",
    techName: "singleBounceVerticallyIn",
    animation: singleBounceVerticallyIn,
  },
} as const;

export type InAnimation = keyof typeof inAnimation;

export const outAnimation = {
  fade: {
    name: "fade",
    techName: "fadeOut",
    animation: fadeOut,
  },
  zoom: {
    name: "zoom",
    techName: "zoomOut",
    animation: zoomOut,
  },
  "zoom with bounce": {
    name: "zoom with bounce",
    techName: "zoomWithBounceOut",
    animation: zoomWithBounceOut,
  },
  "slide vertically": {
    name: "slide vertically",
    techName: "slideVerticallyOut",
    animation: slideVerticallyOut,
  },
  "slide horizontally": {
    name: "slide horizontally",
    techName: "slideHorizontallyOut",
    animation: slideHorizontallyOut,
  },
  "bounce horizontally": {
    name: "bounce horizontally",
    techName: "bounceHorizontallyOut",
    animation: bounceHorizontallyOut,
  },
  "single bounce horizontally": {
    name: "single bounce horizontally",
    techName: "singleBounceHorizontallyOut",
    animation: singleBounceHorizontallyOut,
  },
  "single bounce vertically": {
    name: "single bounce vertically",
    techName: "singleBounceVerticallyOut",
    animation: singleBounceVerticallyOut,
  },
} as const;
export type OutAnimation = keyof typeof outAnimation;

export const inBodyAnimation = {
  zoom: {
    name: "zoom",
    techName: "zoomInBody",
    animation: zoomInBody,
  },
  "slide horizontally with fade": {
    name: "slide horizontally with fade",
    techName: "slideHorizontalWithFadeInBody",
    animation: slideHorizontalWithFadeInBody,
  },
  "slide vertically with fade": {
    name: "slide vertically with fade",
    techName: "slideVerticallyWithFadeInBody",
    animation: slideVerticallyWithFadeInBody,
  },
} as const;
export type InBodyAnimation = keyof typeof inBodyAnimation;
