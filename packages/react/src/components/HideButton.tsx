import { cssClassNames } from "@toastup/core";
import React from "react";
import { HideButtonProps } from "../reactTypes";

export const HideButton: React.FC<HideButtonProps> = ({
  className,
  style,
  onClick,
}: HideButtonProps) => {
  return (
    <button
      type="button"
      aria-label="close"
      className={`${cssClassNames.toastHideButton}${
        className ? ` ${className}` : ""
      }`}
      style={style}
      onClick={event => {
        event.stopPropagation();
        onClick();
      }}
    >
      X
    </button>
  );
};
