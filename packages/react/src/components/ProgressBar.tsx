import { cssClassNames } from "@toastup/core";
import React from "react";
import { ProgressBarProps } from "../reactTypes";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  style,
}) => {
  return (
    <div
      role="progressbar"
      aria-label="notification timer"
      aria-hidden="false"
      className={`${cssClassNames.toastProgressBar}`}
    >
      <div
        className={`${cssClassNames.toastProgressBarForeground}${
          className ? ` ${className}` : ""
        }`}
        style={style}
      />
      <div className={`${cssClassNames.toastProgressBarProgressOverlay}`} />
    </div>
  );
};
