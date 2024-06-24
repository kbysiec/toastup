import { reactEvents } from "@/constants";
import {
  ToastEntity,
  eventManager,
  events,
  getCoalesced,
  getDefaultConfig,
  getToastPropsForCreate,
  registerToastupEventHandlers,
  remove,
  uuid,
} from "@toastup/core";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactEventType,
  ReactToast,
  ReactToastConfig,
  ReactToasterConfig,
} from "../reactTypes";

export function useToaster(toasterConfig: ReactToasterConfig) {
  const eventMgr = eventManager.get<ReactEventType>();

  const [isLoaded, setIsLoaded] = useState(false);
  const [toasterId] = useState(`toaster-${uuid()}`);

  const [toastIds, setToastIds] = useState<string[]>([]);
  const toastManagerListenersRegistered = useRef(false);

  const getConfig = useCallback(
    (toastConfig: Partial<ReactToastConfig>) => {
      const config: ReactToastConfig = getCoalesced<
        ReactToastConfig,
        Partial<ReactToastConfig>
      >(getDefaultConfig(), toasterConfig, toastConfig);
      config.title = toastConfig.title ? toastConfig.title : config.type;
      config.id = toastConfig.id ? toastConfig.id : uuid();

      return config;
    },
    [toasterConfig]
  );

  const handleDidMountToast = useCallback((toast: ToastEntity) => {
    eventMgr.emit(events.mounted, toast);
  }, []);

  const handleRemoveToast = useCallback(
    (toastId: string, withAnimation: boolean) => {
      eventMgr.emit(events.hide, {
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
    (config: Partial<ReactToastConfig>) => {
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
    (config: Partial<ReactToastConfig>) => {
      const toast = getToast(config);

      setToastIds(ids => {
        eventMgr.emit(events.added, toast);
        return [...ids, toast.id];
      });
    },
    [getToast]
  );

  const removeToastsImmediately = useCallback(() => {
    setToastIds([]);
    remove();
  }, []);

  useEffect(() => {
    !toastManagerListenersRegistered.current && registerToastupEventHandlers();
    toastManagerListenersRegistered.current = true;

    return removeToastsImmediately();
  }, []);

  useEffect(() => {
    const callback = (
      event: CustomEvent<{ toastId: string; withAnimation: boolean }>
    ) => {
      const { toastId, withAnimation } = event.detail;
      handleRemoveToast(toastId, withAnimation);
    };
    eventMgr.on(events.remove, callback);

    return () => eventMgr.off(events.remove, callback);
  }, [handleRemoveToast]);

  useEffect(() => {
    const callback = async (event: CustomEvent<ReactToast>) => {
      await handleDidMountToast(event.detail);
    };
    eventMgr.on(reactEvents.reactDidMount, callback);

    return () => eventMgr.off(reactEvents.reactDidMount, callback);
  }, [handleDidMountToast]);

  useEffect(() => {
    const callback = (event: CustomEvent<Partial<ReactToastConfig>>) => {
      handleAddToast(event.detail);
    };
    eventMgr.on(events.add, callback);

    return () => eventMgr.off(events.add, callback);
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
