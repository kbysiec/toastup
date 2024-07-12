import { eventManager } from "@toastup/core";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { reactEvents } from "../src/constants";
import {
  handleAddToast,
  handleDidMountToast,
  handleRemoveAllToasts,
  handleRemoveToast,
  updateToastIds,
} from "../src/handlers";
import { ReactToastConfig, ReactToasterConfig } from "../src/reactTypes";
import { toastBase } from "./mock/mocks";

describe("handlers", () => {
  const onStub = vi.fn();
  const offStub = vi.fn();
  const emitStub = vi.fn();
  const eventManagerStub = {
    on: onStub,
    off: offStub,
    emit: emitStub,
  };

  beforeEach(() => {
    vi.spyOn(eventManager, "get").mockReturnValue(eventManagerStub);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("handleDidMountToast", () => {
    it("should emit 'mounted' event", () => {
      handleDidMountToast(toastBase);

      expect(emitStub).toBeCalledWith(reactEvents.mounted, toastBase);
    });
  });

  describe("handleRemoveToast", () => {
    it("should emit 'hide' event", () => {
      const callback = vi.fn();
      handleRemoveToast("1", true, callback);

      expect(emitStub).toBeCalledWith(reactEvents.hide, {
        toastId: "1",
        withAnimation: true,
        callback,
      });
    });
  });

  describe("handleRemoveAllToasts", () => {
    it("should emit 'hideAll' event", () => {
      const callback = vi.fn();
      handleRemoveAllToasts(true, callback);

      expect(emitStub).toBeCalledWith(reactEvents.hideAll, {
        withAnimation: true,
        callback,
      });
    });
  });

  describe("updateToastIds", () => {
    it("should emit 'added' event", () => {
      updateToastIds([], toastBase);
      expect(emitStub).toBeCalledWith(reactEvents.added, toastBase);
    });
  });

  describe("handleAddToast", () => {
    it("should setToastIds function be invoked", () => {
      const toasterConfig: Partial<ReactToasterConfig> = { toasterId: "1" };
      const config: Partial<ReactToastConfig> = { toasterId: "1" };
      const setToastIdsStub: React.Dispatch<React.SetStateAction<string[]>> =
        vi.fn();

      handleAddToast(toasterConfig, config, setToastIdsStub);

      expect(setToastIdsStub).toHaveBeenCalledOnce();
    });
  });
});
