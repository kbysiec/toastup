import {
  ToasterConfig,
  cssClassNames,
  groupBy,
  toastQueue,
} from "@toastup/core";
import React from "react";
import { createPortal } from "react-dom";
import { useToaster } from "../hooks";
import { Toast } from "./Toast";

export const Toaster: React.FC<ToasterConfig> = React.memo(
  (props: ToasterConfig) => {
    const { isLoaded, toasterId } = useToaster(props);

    const toastMap = toastQueue.get();
    const groupedToasts = groupBy(
      Array.from(toastMap.values()),
      t => t.position
    );
    const positions = Object.keys(groupedToasts) as Array<
      keyof typeof groupedToasts
    >;

    return isLoaded ? (
      createPortal(
        <>
          {positions.map(position => {
            const toasts = groupedToasts[position];
            const containerClassName = `${cssClassNames.toaster}-${position}`;
            return (
              <div key={containerClassName} className={containerClassName}>
                {toasts.map(toast => (
                  <Toast key={toast.id} {...toast} />
                ))}
              </div>
            );
          })}
        </>,
        document.getElementById(toasterId) as HTMLElement
      )
    ) : (
      <></>
    );
  }
);
