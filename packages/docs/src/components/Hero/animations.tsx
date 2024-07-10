import { animation } from "@toastup/react";

export const inAnimation = {
  fade: {
    name: "fade",
    techName: "fadeIn",
    animation: animation.in.fadeIn,
  },
  zoom: {
    name: "zoom",
    techName: "zoomIn",
    animation: animation.in.zoomIn,
  },
  "zoom with bounce": {
    name: "zoom with bounce",
    techName: "zoomWithBounceIn",
    animation: animation.in.zoomWithBounceIn,
  },
  "slide vertically": {
    name: "slide vertically",
    techName: "slideVerticallyIn",
    animation: animation.in.slideVerticallyIn,
  },
  "slide horizontally": {
    name: "slide horizontally",
    techName: "slideHorizontallyIn",
    animation: animation.in.slideHorizontallyIn,
  },
  "bounce horizontally": {
    name: "bounce horizontally",
    techName: "bounceHorizontallyIn",
    animation: animation.in.bounceHorizontallyIn,
  },
  "single bounce horizontally": {
    name: "single bounce horizontally",
    techName: "singleBounceHorizontallyIn",
    animation: animation.in.singleBounceHorizontallyIn,
  },
  "single bounce vertically": {
    name: "single bounce vertically",
    techName: "singleBounceVerticallyIn",
    animation: animation.in.singleBounceVerticallyIn,
  },
} as const;

export type InAnimation = keyof typeof inAnimation;

export const outAnimation = {
  fade: {
    name: "fade",
    techName: "fadeOut",
    animation: animation.out.fadeOut,
  },
  zoom: {
    name: "zoom",
    techName: "zoomOut",
    animation: animation.out.zoomOut,
  },
  "zoom with bounce": {
    name: "zoom with bounce",
    techName: "zoomWithBounceOut",
    animation: animation.out.zoomWithBounceOut,
  },
  "slide vertically": {
    name: "slide vertically",
    techName: "slideVerticallyOut",
    animation: animation.out.slideVerticallyOut,
  },
  "slide horizontally": {
    name: "slide horizontally",
    techName: "slideHorizontallyOut",
    animation: animation.out.slideHorizontallyOut,
  },
  "bounce horizontally": {
    name: "bounce horizontally",
    techName: "bounceHorizontallyOut",
    animation: animation.out.bounceHorizontallyOut,
  },
  "single bounce horizontally": {
    name: "single bounce horizontally",
    techName: "singleBounceHorizontallyOut",
    animation: animation.out.singleBounceHorizontallyOut,
  },
  "single bounce vertically": {
    name: "single bounce vertically",
    techName: "singleBounceVerticallyOut",
    animation: animation.out.singleBounceVerticallyOut,
  },
} as const;
export type OutAnimation = keyof typeof outAnimation;

export const inBodyAnimation = {
  zoom: {
    name: "zoom",
    techName: "zoomInBody",
    animation: animation.body.zoomInBody,
  },
  "slide horizontally with fade": {
    name: "slide horizontally with fade",
    techName: "slideHorizontalWithFadeInBody",
    animation: animation.body.slideHorizontalWithFadeInBody,
  },
  "slide vertically with fade": {
    name: "slide vertically with fade",
    techName: "slideVerticallyWithFadeInBody",
    animation: animation.body.slideVerticallyWithFadeInBody,
  },
} as const;
export type InBodyAnimation = keyof typeof inBodyAnimation;
