import { cssClassNames } from "@toastup/core";
import React from "react";
import { ContainerProps } from "../reactTypes";

export const Container: React.FC<ContainerProps> = ({
  className,
  style,
  children,
}: ContainerProps) => (
  <div
    aria-label="container"
    data-component="container"
    className={`${cssClassNames.container}${className ? ` ${className}` : ""}`}
    style={style}
  >
    {children}
  </div>
);
