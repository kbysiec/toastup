import { cssClassNames } from "@toastup/core";
import React from "react";
import { BodyProps } from "../reactTypes";

export const Body: React.FC<BodyProps> = ({
  className,
  style,
  shouldAnimate,
  children,
  role,
}: BodyProps) => (
  <div
    data-component="body"
    role={role}
    className={`${cssClassNames.body}${
      shouldAnimate
        ? ` ${cssClassNames.bodyInvisible}`
        : ` ${cssClassNames.bodyVisible}`
    }${className ? ` ${className}` : ""}`}
    style={style}
  >
    {children}
  </div>
);
