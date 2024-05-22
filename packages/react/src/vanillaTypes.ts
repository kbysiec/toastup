import {
  ComponentProps,
  ToastConfig,
  ToastEntity,
  ToasterConfig,
  ToastType,
} from "@toastup/core";
import CSS from "csstype";

export interface ContainerProps {
  className: string;
  style: CSS.Properties<string | number>;
  children: (HTMLElement | null)[] | undefined;
}

export interface ProgressBarProps extends ComponentProps {
  className: string;
  style: CSS.Properties<string | number>;
}

export interface HideButtonProps extends ComponentProps {
  className: string;
  style: CSS.Properties<string | number>;
  onClick: () => void;
}

export interface IconProps {
  className: string;
  style: CSS.Properties<string | number>;
  type: ToastType;
}

export interface ContentProps extends ComponentProps {
  className: string;
  style: CSS.Properties<string | number>;
  children: (HTMLElement | null)[] | undefined;
}

export interface BodyProps extends ComponentProps {
  className: string;
  style: CSS.Properties<string | number>;
  shouldAnimate: boolean;
  children: (HTMLElement | null)[] | undefined;
  role: string;
}

export type ToastProps = ToastEntity & {
  children: (HTMLElement | null)[] | undefined;
};

export type VanillaComponent<T> = HTMLElement | ((props: T) => HTMLElement);

type VanillaConfigProps = {
  toast?: VanillaComponent<ToastProps>;
  icon?: VanillaComponent<IconProps>;
  hideButton?: VanillaComponent<HideButtonProps>;
  content?: VanillaComponent<ContentProps>;
  body?: VanillaComponent<BodyProps>;
};

export type VanillaConfig = ToastConfig & VanillaConfigProps;
export type VanillaToast = ToastEntity & VanillaConfigProps;
export type VanillaToasterConfig = ToasterConfig & VanillaConfigProps;
