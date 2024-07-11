import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import * as actionManager from "../../src/actionManager";
import { events } from "../../src/constants";
import { handleHideToast, hide } from "../../src/handlers/hideHandler";
import * as toastPositionManager from "../../src/toastPositionManager";
import * as toastProgressManager from "../../src/toastProgressManager";
import { toastQueue } from "../../src/toastQueue";
import * as toastUtils from "../../src/toastUtils";
import { HidePayload, ToastEntity } from "../../src/types";
import * as utils from "../../src/utils";
import { toastBase } from "../mocks";

describe("hideHandler", () => {
  let queue: Map<string, ToastEntity>;
  let toast = {
    ...toastBase,
  };

  beforeEach(() => {
    toast = {
      ...toastBase,
    };
    queue = new Map<string, ToastEntity>();
    queue.set(toast.id, toast);

    vi.spyOn(toastQueue, "get").mockReturnValue(queue);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("hide", () => {
    const toggleAnimationStub = vi.fn();
    const repositionToastsStub = vi.fn();
    const toggleToastsRepositionTransitionStub = vi.fn();
    const sleepForAnimationTimeStub = vi.fn();
    const executeToastCallbackStub = vi.fn();
    const getToastsForRepositionStub = vi.fn();
    const assureToastsPositionStub = vi.fn();
    const setToastVisibilityStub = vi.fn();
    const sleepStub = vi.fn();
    const togglePauseIfToastsExceedVisibleLimitStub = vi.fn();
    const callback = vi.fn();

    beforeEach(() => {
      vi.spyOn(toastUtils, "toggleAnimation").mockImplementation(
        toggleAnimationStub
      );
      vi.spyOn(toastUtils, "setToastVisibility").mockImplementation(
        setToastVisibilityStub
      );
      vi.spyOn(toastPositionManager, "repositionToasts").mockImplementation(
        repositionToastsStub
      );
      vi.spyOn(
        toastPositionManager,
        "toggleToastsRepositionTransition"
      ).mockImplementation(toggleToastsRepositionTransitionStub);
      vi.spyOn(
        toastPositionManager,
        "getToastsForReposition"
      ).mockImplementation(getToastsForRepositionStub);
      vi.spyOn(toastPositionManager, "assureToastsPosition").mockImplementation(
        assureToastsPositionStub
      );
      vi.spyOn(toastUtils, "sleepForAnimationTime").mockImplementation(
        sleepForAnimationTimeStub
      );
      vi.spyOn(toastUtils, "executeToastCallback").mockImplementation(
        executeToastCallbackStub
      );
      vi.spyOn(utils, "sleep").mockImplementation(sleepStub);
      vi.spyOn(
        toastProgressManager,
        "togglePauseIfToastsExceedVisibleLimit"
      ).mockImplementation(togglePauseIfToastsExceedVisibleLimitStub);
    });

    it("should hide toast with animation with reposition", async () => {
      await hide(toast, true, callback);

      expect(repositionToastsStub).toBeCalled();
      expect(sleepStub).toBeCalled();
      expect(setToastVisibilityStub).toBeCalled();
      expect(toggleAnimationStub).toBeCalledTimes(1);
    });

    it("should hide toast without animation", async () => {
      await hide(toast, false, callback);

      expect(repositionToastsStub).toBeCalled();
      expect(sleepStub).toBeCalled();
      expect(setToastVisibilityStub).toBeCalled();
      expect(toggleAnimationStub).toBeCalledTimes(0);
    });

    it("should callback be invoked on toast hide", async () => {
      await hide(toast, false, callback);

      expect(callback).toBeCalled();
    });
  });

  describe("handleHideToast", () => {
    const registerStub = vi.fn();

    beforeEach(() => {
      vi.spyOn(actionManager, "register").mockImplementation(registerStub);
    });

    it("should do nothing if the toast for given id doesn't exist", async () => {
      const event = new CustomEvent<HidePayload>(events.show, {
        detail: {
          toastId: "999",
          withAnimation: true,
          callback: () => {},
        },
      });

      await handleHideToast(event);

      expect(registerStub).not.toBeCalled();
    });

    it("should do nothing if the toast for given id is during removal", async () => {
      toast.duringRemoval = true;

      const event = new CustomEvent<HidePayload>(events.show, {
        detail: {
          toastId: "123",
          withAnimation: true,
          callback: () => {},
        },
      });

      await handleHideToast(event);

      expect(registerStub).not.toBeCalled();
    });

    it("should add action related to removing toast", async () => {
      toast.duringRemoval = false;

      const event = new CustomEvent<HidePayload>(events.show, {
        detail: {
          toastId: "123",
          withAnimation: true,
          callback: () => {},
        },
      });

      await handleHideToast(event);

      expect(registerStub).toBeCalled();
    });
  });
});
