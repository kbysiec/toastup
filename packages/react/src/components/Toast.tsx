import {
  ComponentProps,
  cssClassNames,
  eventManager,
  events,
  isFunction,
  isHTMLElement,
} from "@toastup/core";
import React, { useCallback, useEffect, useRef } from "react";
import { ReactComponent, ReactToast, ToastComponentProps } from "../reactTypes";
import { Body as DefaultBody } from "./Body";
import { Container } from "./Container";
import { Content as DefaultContent } from "./Content";
import { HideButton as DefaultHideButton } from "./HideButton";
import { Icon as DefaultIcon } from "./Icon";
import { ProgressBar } from "./ProgressBar";

const ToastComponent = React.memo((props: ReactToast) => {
  const {
    title,
    message,
    hide,
    type,
    autoHide,
    showProgress,
    showIcon,
    showHideButton,
    iconClassName,
    hideButtonClassName,
    contentClassName,
    containerClassName,
    bodyClassName,
    progressBarClassName,
    role,
    iconStyle,
    hideButtonStyle,
    contentStyle,
    containerStyle,
    bodyStyle,
    progressBarStyle,
    icon,
    hideButton,
    content,
    body,
    animateBody,
    pause,
    unpause,
    pauseOnFocusLoss,
    toast,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const handleVisibilityChange = useCallback(() => {
    const isTabVisible = document.visibilityState === "visible";

    isTabVisible ? unpause() : pause();
  }, [pause, unpause]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [pauseOnFocusLoss, handleVisibilityChange]);

  useEffect(() => {
    eventManager.emit(events.reactDidMount, { ...props, element: ref.current });
  }, [props]);

  const renderComponent = <T extends ComponentProps>(
    DefaultComponent: React.FC<T>,
    CustomComponent: ReactComponent<T>,
    props: T
  ) => {
    let Component: React.ReactNode = null;

    if (isHTMLElement(CustomComponent)) {
      Component = DefaultComponent(props);
    } else if (CustomComponent && React.isValidElement(CustomComponent)) {
      Component = React.cloneElement(CustomComponent, props);
    } else if (isFunction(CustomComponent)) {
      Component = CustomComponent(props);
    } else {
      Component = DefaultComponent(props);
    }

    return Component;
  };

  const Icon = renderComponent(DefaultIcon, icon, {
    type,
    className: iconClassName,
    style: iconStyle,
  });

  const HideButton = renderComponent(DefaultHideButton, hideButton, {
    className: hideButtonClassName,
    style: hideButtonStyle,
    onClick: () => hide(true),
  });

  const Body = renderComponent(DefaultBody, body, {
    className: bodyClassName,
    style: bodyStyle,
    shouldAnimate: animateBody,
    role: role,
    children: (
      <>
        <div className={`${cssClassNames.toastTitle}`}>{title}</div>
        <div className={`${cssClassNames.toastMessage}`}>{message}</div>
      </>
    ),
  });

  const Content = renderComponent(DefaultContent, content, {
    className: contentClassName,
    style: contentStyle,
    children: (
      <>
        {showIcon ? Icon : <></>}
        {Body}
        {showHideButton ? HideButton : <></>}
        {autoHide && showProgress ? (
          <ProgressBar
            className={progressBarClassName}
            style={progressBarStyle}
          />
        ) : (
          <></>
        )}
      </>
    ),
  });

  const DefaultToast: React.FC<ToastComponentProps> = (
    props: ToastComponentProps
  ) => {
    const {
      id,
      hide,
      type,
      hideOnClick,
      className,
      style,
      rtl,
      pauseOnHover,
      pause,
      unpause,
      dragOnMobile,
      startDragging,
      stopDragging,
      duringDragging,
      theme,
      children,
    } = props;
    return (
      <div
        aria-label="toast"
        ref={ref}
        className={`${cssClassNames.toastDefault} ${
          cssClassNames.toastType[type]
        } ${theme}${rtl ? ` ${cssClassNames.toastRtl}` : ""}${
          className ? ` ${className}` : ""
        }`}
        style={style}
        onClick={e => {
          e.preventDefault();
          eventManager.emit(events.click, id);
          hideOnClick && hide(true);
        }}
        onMouseEnter={pauseOnHover ? () => pause() : undefined}
        onMouseLeave={pauseOnHover ? () => unpause() : undefined}
        onTouchStart={
          dragOnMobile ? event => startDragging(event.nativeEvent) : undefined
        }
        onTouchEnd={
          dragOnMobile
            ? async event => await stopDragging(event.nativeEvent)
            : undefined
        }
        onTouchMove={
          dragOnMobile ? event => duringDragging(event.nativeEvent) : undefined
        }
      >
        {children}
      </div>
    );
  };

  const ToastC = renderComponent(DefaultToast, toast, {
    ...props,
    ref,
    children: (
      <Container className={containerClassName} style={containerStyle}>
        {Content}
      </Container>
    ),
  });

  return <>{ToastC}</>;
});

export { ToastComponent as Toast };
