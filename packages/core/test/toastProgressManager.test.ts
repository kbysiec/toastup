import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import * as toastProgressManager from "../src/toastProgressManager";
import { toastQueue } from "../src/toastQueue";
import { ToastEntity } from "../src/types";
import * as utils from "../src/utils";
import { toastBase } from "./mocks";

describe("toastProgressManager", () => {
  let queue: Map<string, ToastEntity>;
  const getTransformOtherThanStub = vi.fn();

  beforeEach(() => {
    vi.spyOn(utils, "uuid").mockReturnValue("123");
    vi.spyOn(utils, "getTransformOtherThan").mockImplementation(
      getTransformOtherThanStub
    );
    queue = new Map<string, ToastEntity>();
    vi.spyOn(toastQueue, "get").mockReturnValue(queue);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("togglePauseIfToastExceedVisibleLimit", () => {
    it("should pause all toasts which exceed visibleToasts limit", () => {
      const toast = {
        ...toastBase,
        exceedVisibleToastsLimit: true,
      };
      const toast2 = {
        ...toastBase,
        id: "2",
        exceedVisibleToastsLimit: true,
      };
      queue.set(toast.id, toast);
      queue.set(toast2.id, toast2);

      toastProgressManager.togglePauseIfToastsExceedVisibleLimit([
        toast,
        toast2,
      ]);

      expect(toast.autoHideDetails.isPaused).toBe(true);
    });
  });

  describe("pauseInternal", () => {
    it("should set toast autoHideDetails isPaused property to true", () => {
      const toast = {
        ...toastBase,
        autoHideDetails: { isPaused: false, timeVisible: 0 },
      };
      queue.set(toast.id, toast);

      toastProgressManager.pauseInternal(toast.id);

      expect(toast.autoHideDetails.isPaused).toBe(true);
    });
  });

  describe("unpauseInternal", () => {
    it("should set toast autoHideDetails isPaused property to false", () => {
      const toast = {
        ...toastBase,
        autoHideDetails: { isPaused: true, timeVisible: 0 },
      };
      queue.set(toast.id, toast);

      toastProgressManager.unpauseInternal(toast.id);

      expect(toast.autoHideDetails.isPaused).toBe(false);
    });

    it("should do nothing if there isn't toast in the queue for given id", () => {
      const toast = {
        ...toastBase,
        autoHideDetails: { isPaused: true, timeVisible: 0 },
      };
      queue.set("999", toast);

      toastProgressManager.unpauseInternal(toast.id);

      expect(toast.autoHideDetails.isPaused).toBe(true);
    });
  });
});
