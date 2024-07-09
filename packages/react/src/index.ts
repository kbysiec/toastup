import "@toastup/core/style";

import { add } from "@toastup/core";
import { ReactToastConfig } from "./reactTypes";
const reactAdd = add<ReactToastConfig>;

export * from "@toastup/core";
export * from "./components/Body";
export * from "./components/Container";
export * from "./components/Content";
export * from "./components/HideButton";
export * from "./components/Icon";
export * from "./components/ProgressBar";
export * from "./components/Toast";
export * from "./components/Toaster";
export * from "./reactTypes";
export { reactAdd as add };
