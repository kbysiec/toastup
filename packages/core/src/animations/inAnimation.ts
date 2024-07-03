// import "animate.css";
import { animationType } from "../constants";
import { ToastInAnimation } from "../types";

export const fadeIn: ToastInAnimation = {
  type: animationType.in,
  animationName: "fade-in",
  animationTime: 350,
};

export const zoomIn: ToastInAnimation = {
  type: animationType.in,
  animationName: "zoom-in",
  animationTime: 350,
};

export const zoomWithBounceIn: ToastInAnimation = {
  type: animationType.in,
  animationName: "zoom-with-bounce-in",
  animationTime: 350,
};

export const slideVerticallyIn: ToastInAnimation = {
  type: animationType.in,
  animationName: "slide-vertically-in",
  animationTime: 350,
};

export const slideHorizontallyIn: ToastInAnimation = {
  type: animationType.in,
  animationName: "slide-horizontally-in",
  animationTime: 350,
};

export const bounceHorizontallyIn: ToastInAnimation = {
  type: animationType.in,
  animationName: "bounce-horizontally-in",
  animationTime: 350,
};

export const singleBounceHorizontallyIn: ToastInAnimation = {
  type: animationType.in,
  animationName: "single-bounce-horizontally-in",
  animationTime: 350,
};

export const singleBounceVerticallyIn: ToastInAnimation = {
  type: animationType.in,
  animationName: "single-bounce-vertically-in",
  animationTime: 350,
};

// example of animation based on a className not keyframes directly
// export const flipXIn: ToastInAnimation = {
//   type: animationType.in,
//   className: "animate__animated animate__flipInX",
//   animationTime: 350,
// };
