import { EventCallback, EventType, Payload } from "./types";

export const eventManager = {
  on(type: EventType, callback: EventCallback) {
    document.addEventListener(type, callback);
  },
  off(type: EventType, callback: EventCallback) {
    document.removeEventListener(type, callback);
  },
  emit(type: EventType, payload: Payload) {
    const event = new CustomEvent(type, {
      detail: payload,
    });
    document.dispatchEvent(event);
  },
};
