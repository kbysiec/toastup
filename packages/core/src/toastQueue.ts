import { ToastEntity } from "./types";

const queue = new Map<string, ToastEntity>();

export function get() {
  return queue;
}

export function addToQueue(toast: ToastEntity) {
  const toastMap = toastQueue.get();
  const existingToast = toastMap.get(toast.id);
  if (toastMap.has(toast.id) && existingToast?.uuid !== toast.uuid) {
    throw new Error(`Toast with id ${toast.id} already exists!`);
  }
  toastMap.set(toast.id, toast);
}

export function update(toast: ToastEntity) {
  const toastMap = toastQueue.get();
  toastMap.set(toast.id, toast);
}

export const toastQueue = {
  get,
};
