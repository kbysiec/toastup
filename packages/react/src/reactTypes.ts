import {
  ComponentProps,
  ToastConfig,
  ToastEntity,
  ToasterConfig,
  ToastType,
} from "@toastup/core";
import { reactEvents } from "./constants";

const reactEventValues = Object.values(reactEvents).flat();
export type ReactEventType = (typeof reactEventValues)[number];

export interface ContainerProps {
  className: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}

export interface ProgressBarProps extends ComponentProps {
  className: string;
  style: React.CSSProperties;
}

export interface HideButtonProps extends ComponentProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

export interface IconProps {
  className: string;
  style: React.CSSProperties;
  type: ToastType;
}

export interface ContentProps extends ComponentProps {
  className: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}

export interface BodyProps extends ComponentProps {
  className: string;
  style: React.CSSProperties;
  shouldAnimate: boolean;
  children: React.ReactNode;
  role: string;
}

export type ToastComponentProps = ToastEntity & {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement>;
};

export type ReactComponent<T> =
  | React.ReactNode
  | ((props: T) => React.ReactNode);
// | (() => React.ReactNode)

type ReactConfigProps = {
  toast?: ReactComponent<ToastComponentProps>;
  icon?: ReactComponent<IconProps>;
  hideButton?: ReactComponent<HideButtonProps>;
  content?: ReactComponent<ContentProps>;
  body?: ReactComponent<BodyProps>;
};

export type ReactToastConfig = ToastConfig & ReactConfigProps;
export type ReactToast = ToastEntity & ReactConfigProps;
export type ReactToasterConfig = ToasterConfig & ReactConfigProps;
