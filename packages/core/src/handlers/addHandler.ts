import { addToQueue } from "@/toastQueue";
import { ToastEntity } from "@/types";

export function handleAddedToast(event: CustomEvent<ToastEntity>) {
  const toast = event.detail;
  addToQueue(toast);
}
