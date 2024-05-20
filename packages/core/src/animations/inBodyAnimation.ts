import { animationType } from "@/constants";
import { ToastInBodyAnimation } from "@/types";
import "./inBodyAnimation.scss";

export const zoomInBody: ToastInBodyAnimation = {
  type: animationType.body,
  animationName: "zoom-in-body",
  animationTime: 350,
};

export const slideHorizontalWithFadeInBody: ToastInBodyAnimation = {
  type: animationType.body,
  animationName: "slide-horizontal-with-fade-in-body",
  animationTime: 250,
};

export const slideVerticallyWithFadeInBody: ToastInBodyAnimation = {
  type: animationType.body,
  animationName: "slide-vertically-in-body",
  animationTime: 250,
};
