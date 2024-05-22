import { cssClassNames } from "@toastup/core";
import React from "react";
import { ContentProps } from "../reactTypes";

export const Content: React.FC<ContentProps> = ({
  className,
  style,
  children,
}: ContentProps) => (
  <div
    aria-label="content"
    className={`${cssClassNames.content}${className ? ` ${className}` : ""}`}
    style={style}
  >
    {children}
  </div>
);
