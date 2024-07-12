import {
  ToastEntity,
  ToastProps,
  eventManager,
  events,
  getCoalesced,
  getDefaultConfig,
  getToastPropsForCreate,
  uuid,
} from "@toastup/core";
import {
  ReactEventType,
  ReactToastConfig,
  ReactToasterConfig,
} from "./reactTypes";

const getConfig = (
  toasterConfig: Partial<ReactToasterConfig>,
  toastConfig: Partial<ReactToastConfig>
) => {
  const config: ToastProps = getCoalesced(
    getDefaultConfig(),
    toasterConfig,
    toastConfig
  );
  config.toasterId = toastConfig.toasterId;
  config.title = toastConfig.title ? toastConfig.title : config.type;
  config.id = toastConfig.id ? toastConfig.id : uuid();

  return config;
};

const getToast = (
  toasterConfig: Partial<ReactToasterConfig>,
  toastConfig: Partial<ReactToastConfig>,
  onRemove: () => void
) => {
  const config = getConfig(toasterConfig, toastConfig);
  const toastPropsForCreate = getToastPropsForCreate(config);
  const toast: ToastEntity = {
    ...config,
    ...toastPropsForCreate,
    hide: (withAnimation = true) =>
      handleRemoveToast(config.id, withAnimation, onRemove),
  };
  return toast;
};

export const handleDidMountToast = (toast: ToastEntity) => {
  const eventMgr = eventManager.get<ReactEventType>();
  eventMgr.emit(events.mounted, toast);
};

export const handleRemoveToast = (
  toastId: string,
  withAnimation: boolean,
  callback: () => void
) => {
  const eventMgr = eventManager.get<ReactEventType>();
  eventMgr.emit(events.hide, {
    toastId,
    withAnimation,
    callback,
  });
};

export const handleRemoveAllToasts = (
  withAnimation: boolean,
  callback: () => void
) => {
  const eventMgr = eventManager.get<ReactEventType>();
  eventMgr.emit(events.hideAll, {
    withAnimation,
    callback,
  });
};

export const updateToastIds = (ids: string[], toast: ToastEntity) => {
  const eventMgr = eventManager.get<ReactEventType>();
  eventMgr.emit(events.added, toast);
  return [...ids, toast.id];
};

export const handleAddToast = (
  toasterConfig: Partial<ReactToasterConfig>,
  config: Partial<ReactToastConfig>,
  setToastIds: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const toast = getToast(toasterConfig, config, () => setToastIds([]));

  toast.toasterId === toasterConfig.toasterId &&
    setToastIds(ids => updateToastIds(ids, toast));
};
