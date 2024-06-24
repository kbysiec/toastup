import { EventCallback, EventType, Payload } from "./types";

const get = <T extends string = EventType>() => ({
  on: (type: T, callback: EventCallback) => {
    document.addEventListener(type, callback as EventListener);
  },
  off: (type: T, callback: EventCallback) => {
    document.removeEventListener(type, callback as EventListener);
  },
  emit: (type: T, payload: Payload) => {
    const event = new CustomEvent(type, {
      detail: payload,
    });
    document.dispatchEvent(event);
  },
});

export const eventManager = {
  get,
};
