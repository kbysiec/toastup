import { events } from "@toastup/core";

export const reactEvents = {
  ...events,
  reactDidMount: "toastup:react_did_mount_toast",
} as const;
