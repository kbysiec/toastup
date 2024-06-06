import { animationType } from "../constants";
import { ToastOutAnimation } from "../types";

export const fadeOut: ToastOutAnimation = {
  type: animationType.out,
  animationName: "fade-out",
  animationTime: 350,
};

export const zoomOut: ToastOutAnimation = {
  type: animationType.out,
  animationName: "zoom-out",
  animationTime: 350,
};

export const zoomWithBounceOut: ToastOutAnimation = {
  type: animationType.out,
  animationName: "zoom-with-bounce-out",
  animationTime: 350,
};

export const slideVerticallyOut: ToastOutAnimation = {
  type: animationType.out,
  animationName: "slide-vertically-out",
  animationTime: 350,
};

export const slideHorizontallyOut: ToastOutAnimation = {
  type: animationType.out,
  animationName: "slide-horizontally-out",
  animationTime: 350,
};

export const bounceHorizontallyOut: ToastOutAnimation = {
  type: animationType.out,
  animationName: "bounce-horizontally-out",
  animationTime: 350,
};

export const singleBounceHorizontallyOut: ToastOutAnimation = {
  type: animationType.out,
  animationName: "single-bounce-horizontally-out",
  animationTime: 350,
};

export const flipXOut: ToastOutAnimation = {
  type: animationType.out,
  className: "animate__animated animate__flipOutX",
  animationTime: 350,
};

export const singleBounceVerticallyOut: ToastOutAnimation = {
  type: animationType.out,
  animationName: "single-bounce-vertically-out",
  animationTime: 350,
};
