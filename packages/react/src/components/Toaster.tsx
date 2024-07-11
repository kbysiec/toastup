import {
  ToasterConfig,
  cssClassNames,
  groupBy,
  toastQueue,
} from "@toastup/core";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useToaster } from "../hooks";
import { Toast } from "./Toast";

export const Toaster: React.FC<ToasterConfig> = React.memo(
  (props: ToasterConfig) => {
    const { isLoaded, toasterDOMId } = useToaster(props);
    const [toasterId] = useState(props.toasterId);

    const toastMap = toastQueue.get();
    const toastArray = Array.from(toastMap.values());
    const toastsForToasterId = toastArray.filter(
      toast => toast.toasterId === toasterId
    );

    const groupedToasts = groupBy(toastsForToasterId, t => t.position);
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
        document.getElementById(toasterDOMId) as HTMLElement
      )
    ) : (
      <></>
    );
  }
);
