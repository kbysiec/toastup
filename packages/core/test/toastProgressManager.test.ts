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

describe("toastUtils", () => {
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

  describe("togglePauseIfExceedVisibleToastLimit", () => {
    it("should pause toast if it exceeds visibleToasts limit", () => {
      const toast = {
        ...toastBase,
        exceedVisibleToastsLimit: true,
      };
      queue.set(toast.id, toast);

      toastProgressManager.togglePauseIfExceedVisibleToastLimit(toast);

      expect(toast.autoHideDetails.isPaused).toBe(true);
    });
  });

  describe("pause", () => {
    it("should set toast autoHideDetails isPaused property to true", () => {
      const toast = {
        ...toastBase,
        autoHideDetails: { isPaused: false, timeVisible: 0 },
      };
      queue.set(toast.id, toast);

      toastProgressManager.pause(toast.id);

      expect(toast.autoHideDetails.isPaused).toBe(true);
    });
  });

  describe("unpause", () => {
    it("should set toast autoHideDetails isPaused property to false", () => {
      const toast = {
        ...toastBase,
        autoHideDetails: { isPaused: true, timeVisible: 0 },
      };
      queue.set(toast.id, toast);

      toastProgressManager.unpause(toast.id);

      expect(toast.autoHideDetails.isPaused).toBe(false);
    });

    it("should do nothing if there isn't toast in the queue for given id", () => {
      const toast = {
        ...toastBase,
        autoHideDetails: { isPaused: true, timeVisible: 0 },
      };
      queue.set("999", toast);

      toastProgressManager.unpause(toast.id);

      expect(toast.autoHideDetails.isPaused).toBe(true);
    });
  });
});
