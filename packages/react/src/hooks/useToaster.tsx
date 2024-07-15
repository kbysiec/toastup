import {
  eventManager,
  events,
  registerToastupEventHandlers,
  remove,
  uuid,
} from "@toastup/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { reactEvents } from "../constants";
import {
  handleAddToast,
  handleDidMountToast,
  handleRemoveAllToasts,
} from "../handlers";
import {
  ReactEventType,
  ReactToast,
  ReactToastConfig,
  ReactToasterConfig,
} from "../reactTypes";

export function useToaster(toasterConfig: ReactToasterConfig) {
  const eventMgr = useMemo(() => eventManager.get<ReactEventType>(), []);

  const [isLoaded, setIsLoaded] = useState(false);
  const [toasterDOMId] = useState(`toaster-${uuid()}`);

  const [toastIds, setToastIds] = useState<string[]>([]);
  const toastManagerListenersRegistered = useRef(false);

  useEffect(() => {
    !toastManagerListenersRegistered.current && registerToastupEventHandlers();
    toastManagerListenersRegistered.current = true;

    return remove({
      withAnimation: false,
      callback: () => setToastIds([]),
    });
  }, []);

  useEffect(() => {
    const callback = (
      event: CustomEvent<{ withAnimation: boolean; callback?: () => void }>
    ) => {
      const { withAnimation, callback: cbk } = event.detail;
      handleRemoveAllToasts(withAnimation, () => {
        setToastIds([]);
        cbk && cbk();
      });
    };
    eventMgr.on(events.removeAll, callback);

    return () => eventMgr.off(events.removeAll, callback);
  }, [eventMgr]);

  useEffect(() => {
    const callback = async (event: CustomEvent<ReactToast>) => {
      await handleDidMountToast(event.detail);
    };
    eventMgr.on(reactEvents.reactDidMount, callback);

    return () => eventMgr.off(reactEvents.reactDidMount, callback);
  }, [eventMgr]);

  useEffect(() => {
    const callback = (event: CustomEvent<Partial<ReactToastConfig>>) => {
      handleAddToast(toasterConfig, event.detail, setToastIds);
    };
    eventMgr.on(events.add, callback);

    return () => eventMgr.off(events.add, callback);
  }, [toastIds, toasterConfig, eventMgr]);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const div = document.createElement("div");
    div.id = toasterDOMId;
    div.classList.add("toaster");
    body.append(div);

    setIsLoaded(true);

    return () => {
      body.removeChild(div);
    };
  }, [toasterDOMId]);

  return { isLoaded, toasterDOMId };
}
