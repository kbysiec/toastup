import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cssClassNames } from "../../src/constants";
import {
  dragHandler,
  duringDragging,
  startDragging,
  stopDragging,
  toggleToastDragTransition,
} from "../../src/handlers/dragHandler";
import { toastQueue } from "../../src/toastQueue";
import * as toastUtils from "../../src/toastUtils";
import { ToastEntity } from "../../src/types";
import * as utils from "../../src/utils";
import { toastBase } from "../mocks";

describe("dragHandler", () => {
  const toggleToastDragTransitionStub = vi.fn();
  const updateToastTranslateStub = vi.fn();
  const pauseStub = vi.fn();
  const unpauseStub = vi.fn();

  let queue: Map<string, ToastEntity>;
  let toast = {
    ...toastBase,
    element: document.createElement("div"),
  };

  beforeEach(() => {
    toast = {
      ...toastBase,
      uuid: "1",
      id: "1",
      element: document.createElement("div"),
    };
    queue = new Map<string, ToastEntity>();
    queue.set(toast.id, toast);

    vi.spyOn(toastQueue, "get").mockReturnValue(queue);
    vi.spyOn(toast, "pause").mockImplementation(pauseStub);
    vi.spyOn(toast, "unpause").mockImplementation(unpauseStub);
    vi.spyOn(toastUtils, "updateToastTranslate").mockImplementation(
      updateToastTranslateStub
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("startDragging", () => {
    beforeEach(() => {
      vi.spyOn(toast.element, "offsetWidth", "get").mockReturnValue(500);
      vi.spyOn(dragHandler, "toggleToastDragTransition").mockImplementation(
        toggleToastDragTransitionStub
      );
    });

    it("should set drag values for the toast", () => {
      const event = {
        targetTouches: [{ clientX: 1000 }],
      } as unknown as TouchEvent;

      startDragging(event, toast.id);

      expect(toast.dragDetails.x).toBe(1000);
      expect(toast.dragDetails.start).toBe(1000);
      expect(toast.dragDetails.removalDistance).toBe(350);
      expect(toast.dragDetails.shouldHandleDragMove).toBe(true);
    });

    it("should set drag start property to 0 value of the event if targetTouches event property is undefined", () => {
      const event = {
        clientX: 1000,
      } as unknown as TouchEvent;

      startDragging(event, toast.id);

      expect(toast.dragDetails.x).toBe(0);
      expect(toast.dragDetails.start).toBe(0);
    });

    it("should toggleToastDragTransition fn be invoked", () => {
      const event = {} as unknown as TouchEvent;

      startDragging(event, toast.id);

      expect(toggleToastDragTransitionStub).toBeCalled();
    });

    it("should do nothing if there is not a toast for given id", async () => {
      const event = {
        clientX: 1000,
      } as unknown as TouchEvent;

      queue.clear();

      startDragging(event, toast.id);

      expect(toggleToastDragTransitionStub).not.toHaveBeenCalled();
    });
  });

  describe("stopDragging", () => {
    const hideStub = vi.fn();

    beforeEach(() => {
      vi.spyOn(utils, "sleep").mockImplementation(() => Promise.resolve());
      vi.spyOn(toast, "hide").mockImplementation(hideStub);
    });

    it("should remove fn be invoked if Math.abs of drag delta is greater than drag removalDistance property of toast", async () => {
      toast.dragDetails.shouldHandleDragMove = true;
      toast.dragDetails.wasMoved = true;
      toast.dragDetails.removalDistance = 350;
      toast.dragDetails.delta = -400;

      const event = {} as unknown as TouchEvent;
      await stopDragging(event, toast.id);

      expect(hideStub).toHaveBeenCalled();
    });

    it("should style opacity be reset if drag Math.abs of drag delta is less than drag removalDistance property of toast", async () => {
      toast.dragDetails.shouldHandleDragMove = true;
      toast.dragDetails.wasMoved = true;
      toast.dragDetails.removalDistance = 350;
      toast.dragDetails.delta = -200;

      const event = {} as unknown as TouchEvent;
      await stopDragging(event, toast.id);

      expect(toast.element.style.opacity).toBe("");
    });

    it("should multiply drag delta by 1.3 for smooth animation of toast drag", async () => {
      toast.dragDetails.shouldHandleDragMove = true;
      toast.dragDetails.wasMoved = true;
      toast.dragDetails.delta = 200;

      const event = {} as unknown as TouchEvent;
      await stopDragging(event, toast.id);

      expect(toast.dragDetails.delta).toBe(260);
    });

    it("should do nothing if drag shouldHandleDragMove or wasMoved property is set to false", async () => {
      toast.dragDetails.shouldHandleDragMove = false;

      const event = {} as unknown as TouchEvent;
      await stopDragging(event, toast.id);

      expect(updateToastTranslateStub).not.toHaveBeenCalled();
    });

    it("should do nothing if there is not a toast for given id", async () => {
      toast.dragDetails.shouldHandleDragMove = false;
      queue.clear();

      const event = {} as unknown as TouchEvent;
      await stopDragging(event, toast.id);

      expect(updateToastTranslateStub).not.toHaveBeenCalled();
    });
  });

  describe("duringDragging", () => {
    it("should set drag values for the toast", () => {
      toast.dragDetails.shouldHandleDragMove = true;
      toast.dragDetails.start = 1000;

      const event = {
        targetTouches: [{ clientX: 1200 }],
      } as unknown as TouchEvent;

      duringDragging(event, toast.id);

      expect(toast.dragDetails.x).toBe(1200);
      expect(toast.dragDetails.wasMoved).toBe(true);
      expect(toast.dragDetails.delta).toBe(200);
    });

    it("should set calculated opacity for the toast", () => {
      toast.dragDetails.shouldHandleDragMove = true;
      toast.dragDetails.start = 1000;
      toast.dragDetails.removalDistance = 350;

      const event = {
        targetTouches: [{ clientX: 1200 }],
      } as unknown as TouchEvent;

      duringDragging(event, toast.id);

      expect(toast.element.style.opacity).toBe("0.4285714285714286");
    });

    it("should do nothing if drag shouldHandleDragMove property is set to false", () => {
      toast.dragDetails.shouldHandleDragMove = false;

      const event = {
        targetTouches: [{ clientX: 1200 }],
      } as unknown as TouchEvent;

      duringDragging(event, toast.id);

      expect(updateToastTranslateStub).not.toHaveBeenCalled();
    });
  });

  describe("toggleToastDragTransition", () => {
    it("should add drag transition class for toast", () => {
      toggleToastDragTransition(toast, true);

      expect(toast.element?.className).toEqual(cssClassNames.toastDragging);
    });
  });
});
