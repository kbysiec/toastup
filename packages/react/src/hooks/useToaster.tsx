import {
  ToastEntity,
  eventManager,
  events,
  getCoalesced,
  getDefaultConfig,
  getToastPropsForCreate,
  registerToastupEventHandlers,
  uuid,
} from "@toastup/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReactConfig, ReactToast, ReactToasterConfig } from "../reactTypes";

export function useToaster(toasterConfig: ReactToasterConfig) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [toasterId] = useState(`toaster-${uuid()}`);

  const [toastIds, setToastIds] = useState<string[]>([]);
  const toastManagerListenersRegistered = useRef(false);

  const getConfig = useCallback(
    (overriddenConfig: Partial<ReactConfig>) => {
      const config = getCoalesced<ReactConfig, Partial<ReactConfig>>(
        getDefaultConfig(),
        toasterConfig,
        overriddenConfig
      );
      config.title = overriddenConfig.title
        ? overriddenConfig.title
        : config.type;
      config.id = overriddenConfig.id ? overriddenConfig.id : uuid();

      return config;
    },
    [toasterConfig]
  );

  const handleDidMountToast = useCallback((toast: ToastEntity) => {
    eventManager.emit(events.mounted, toast);
  }, []);

  const handleRemoveToast = useCallback(
    (toastId: string, withAnimation: boolean) => {
      eventManager.emit(events.hide, {
        toastId,
        withAnimation,
        callback: () => {
          setToastIds(ids => ids.filter(tId => tId !== toastId));
        },
      });
    },
    []
  );

  const getToast = useCallback(
    (config: Partial<ReactConfig>) => {
      const toastConfig = getConfig(config);
      const toastPropsForCreate = getToastPropsForCreate(toastConfig);
      const toast: ReactToast = {
        ...toastConfig,
        ...toastPropsForCreate,
        hide: (withAnimation = true) =>
          handleRemoveToast(toastConfig.id, withAnimation),
      };
      return toast;
    },
    [getConfig, handleRemoveToast]
  );

  const handleAddToast = useCallback(
    (config: Partial<ReactConfig>) => {
      const toast = getToast(config);

      setToastIds(ids => {
        eventManager.emit(events.added, toast);
        return [...ids, toast.id];
      });
    },
    [getToast]
  );

  useEffect(() => {
    !toastManagerListenersRegistered.current && registerToastupEventHandlers();
    toastManagerListenersRegistered.current = true;
  }, []);

  useEffect(() => {
    const callback = (
      event: CustomEvent<{ toastId: string; withAnimation: boolean }>
    ) => {
      const { toastId, withAnimation } = event.detail;
      handleRemoveToast(toastId, withAnimation);
    };
    eventManager.on(events.remove, callback);

    return () => eventManager.off(events.remove, callback);
  }, [handleRemoveToast]);

  useEffect(() => {
    const callback = async (event: CustomEvent<ReactToast>) => {
      await handleDidMountToast(event.detail);
    };
    eventManager.on(events.reactDidMount, callback);

    return () => eventManager.off(events.reactDidMount, callback);
  }, [handleDidMountToast]);

  useEffect(() => {
    const callback = (event: CustomEvent<Partial<ReactConfig>>) => {
      handleAddToast(event.detail);
    };
    eventManager.on(events.add, callback);

    return () => eventManager.off(events.add, callback);
  }, [toastIds, handleAddToast]);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const div = document.createElement("div");
    div.id = toasterId;
    div.classList.add("toaster");
    body.append(div);

    setIsLoaded(true);

    return () => {
      body.removeChild(div);
    };
  }, [toasterId]);

  return { isLoaded, toasterId };
}
