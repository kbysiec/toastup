import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  actionType,
  cssClassNames,
  displayOrder,
  position,
} from "../src/constants";
import {
  assureToastsPosition,
  getToastsForReposition,
  reindexToastsForPosition,
  repositionToasts,
  toggleToastsRepositionTransition,
} from "../src/toastPositionManager";
import * as utils from "../src/utils";
import { toastBase } from "./mocks";

describe("toastPositionManager", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("toggleToastsRepositionTransition", () => {
    it("should add transition class for each toast", () => {
      const toast = {
        ...toastBase,
        element: document.createElement("div"),
      };
      const toast2 = {
        ...toastBase,
        element: document.createElement("div"),
      };
      const toasts = [toast, toast2];

      toggleToastsRepositionTransition(toasts, true);

      expect(toast.element.className).toEqual(cssClassNames.toastRepositioning);
      expect(toast2.element.className).toEqual(
        cssClassNames.toastRepositioning
      );
    });

    it("should add quick transition class for each toast", () => {
      const toast = {
        ...toastBase,
        element: document.createElement("div"),
      };
      const toast2 = {
        ...toastBase,
        element: document.createElement("div"),
      };
      const toasts = [toast, toast2];

      toggleToastsRepositionTransition(toasts, true, true);

      expect(toast.element.className).toEqual(
        cssClassNames.toastQuickRepositioning
      );
      expect(toast2.element.className).toEqual(
        cssClassNames.toastQuickRepositioning
      );
    });
  });

  describe("getToastsForReposition", () => {
    it("should return toasts for reposition on add", () => {
      const addedToast = {
        ...toastBase,
        id: "0",
        position: position.topLeft,
      };
      const toast = {
        ...toastBase,
        id: "1",
        position: position.topLeft,
        isVisible: true,
      };
      const toast2 = {
        ...toastBase,
        id: "2",
        position: position.bottomLeft,
        isVisible: true,
      };
      const toast3 = {
        ...toastBase,
        id: "3",
        position: position.topLeft,
        isVisible: true,
      };
      const toasts = [toast, toast2, toast3];

      const toastsForReposition = getToastsForReposition(
        toasts,
        addedToast,
        actionType.add
      );

      expect(toastsForReposition).toEqual([toast, toast3]);
    });

    it("should return toasts for reposition on remove", () => {
      const removedToast = {
        ...toastBase,
        id: "0",
        position: position.topLeft,
      };
      const toast = {
        ...toastBase,
        id: "1",
        position: position.topLeft,
        isVisible: true,
      };
      const toast2 = {
        ...toastBase,
        id: "2",
        position: position.bottomLeft,
        isVisible: true,
      };
      const toast3 = {
        ...toastBase,
        id: "3",
        position: position.topLeft,
        isVisible: true,
      };
      const toasts = [toast, toast2, toast3];

      const toastsForReposition = getToastsForReposition(
        toasts,
        removedToast,
        actionType.remove
      );

      expect(toastsForReposition).toEqual([toast, toast3]);
    });
  });

  describe("repositionToasts", () => {
    beforeEach(() => {
      vi.spyOn(utils, "getTransformOtherThan").mockReturnValue("");
    });

    it("should increase each toast translateY value if added toast position is top on open", () => {
      const addedToast = {
        ...toastBase,
        position: position.topLeft,
        dimensions: { height: 100, width: 150 },
        element: document.createElement("div"),
      };
      const toast = { ...toastBase };
      const toast2 = { ...toastBase };
      const toast3 = { ...toastBase };
      const toasts = [toast, toast2, toast3];

      let translateY = 0;

      toasts.forEach(t => {
        t.element = document.createElement("div");
        t.position = position.topLeft;
        t.dimensions = { height: 50, width: 150 };
        t.translate = { x: 0, y: translateY };
        translateY = translateY + 50;
      });

      repositionToasts(toasts, addedToast, actionType.add);

      expect(toast.translate).toEqual({ x: 0, y: 100 });
      expect(toast2.translate).toEqual({ x: 0, y: 150 });
      expect(toast3.translate).toEqual({ x: 0, y: 200 });
    });

    it("should decrease each toast translateY value if added toast position is top on open", () => {
      const addedToast = {
        ...toastBase,
        position: position.bottomCenter,
        dimensions: { height: 100, width: 150 },
        element: document.createElement("div"),
      };
      const toast = { ...toastBase };
      const toast2 = { ...toastBase };
      const toast3 = { ...toastBase };
      const toasts = [toast, toast2, toast3];

      let translateY = 0;

      toasts.forEach(t => {
        t.element = document.createElement("div");
        t.position = position.bottomCenter;
        t.dimensions = { height: 50, width: 150 };
        t.translate = { x: 0, y: translateY };
        translateY = translateY - 50;
      });

      repositionToasts(toasts, addedToast, actionType.add);

      expect(toast.translate).toEqual({ x: 0, y: -100 });
      expect(toast2.translate).toEqual({ x: 0, y: -150 });
      expect(toast3.translate).toEqual({ x: 0, y: -200 });
    });

    it("should decrease each toast translateY value if removed toast position is top on hide", () => {
      const removedToast = {
        ...toastBase,
        position: position.topLeft,
        dimensions: { height: 100, width: 150 },
        element: document.createElement("div"),
      };
      const toast = { ...toastBase };
      const toast2 = { ...toastBase };
      const toast3 = { ...toastBase };
      const toasts = [toast, toast2, toast3];

      let translateY = 100;

      toasts.forEach(t => {
        t.element = document.createElement("div");
        t.position = position.topLeft;
        t.dimensions = { height: 50, width: 150 };
        t.translate = { x: 0, y: translateY };
        translateY = translateY + 50;
      });

      repositionToasts(toasts, removedToast, actionType.remove);

      expect(toast.translate).toEqual({ x: 0, y: 0 });
      expect(toast2.translate).toEqual({ x: 0, y: 50 });
      expect(toast3.translate).toEqual({ x: 0, y: 100 });
    });

    it("should increase each toast translateY value if removed toast position is bottom on hide", () => {
      const removedToast = {
        ...toastBase,
        position: position.bottomCenter,
        dimensions: { height: 100, width: 150 },
        element: document.createElement("div"),
      };
      const toast = { ...toastBase };
      const toast2 = { ...toastBase };
      const toast3 = { ...toastBase };
      const toasts = [toast, toast2, toast3];

      let translateY = -100;

      toasts.forEach(t => {
        t.element = document.createElement("div");
        t.position = position.bottomCenter;
        t.dimensions = { height: 50, width: 150 };
        t.translate = { x: 0, y: translateY };
        translateY = translateY - 50;
      });

      repositionToasts(toasts, removedToast, actionType.remove);

      expect(toast.translate).toEqual({ x: 0, y: 0 });
      expect(toast2.translate).toEqual({ x: 0, y: -50 });
      expect(toast3.translate).toEqual({ x: 0, y: -100 });
    });
  });

  describe("assureToastsPosition", () => {
    beforeEach(() => {
      vi.spyOn(utils, "getTransformOtherThan").mockReturnValue("");
      vi.spyOn(utils, "sleep").mockImplementation(() => Promise.resolve());
    });

    it("should set translateY to correct value for every visible toast with bottom position", async () => {
      const addedToast = {
        ...toastBase,
        isVisible: true,
        index: 1,
        translate: { x: 0, y: 0 },
        element: document.createElement("div"),
      };
      const toast = {
        ...toastBase,
        index: 0,
        isVisible: true,
        translate: { x: 0, y: 0 },
        dimensions: { height: 100, width: 150 },
        element: document.createElement("div"),
      };
      const toasts = [toast, addedToast];

      await assureToastsPosition(addedToast, toasts);

      expect(addedToast.translate).toEqual({ x: 0, y: -100 });
    });

    it("should set translateY to correct value for every visible toast with top position", async () => {
      const addedToast = {
        ...toastBase,
        position: position.topLeft,
        isVisible: true,
        index: 1,
        translate: { x: 0, y: 0 },
        element: document.createElement("div"),
      };
      const toast = {
        ...toastBase,
        position: position.topLeft,
        index: 0,
        isVisible: true,
        translate: { x: 0, y: 0 },
        dimensions: { height: 100, width: 150 },
        element: document.createElement("div"),
      };
      const toasts = [toast, addedToast];

      await assureToastsPosition(addedToast, toasts);

      expect(addedToast.translate).toEqual({ x: 0, y: 100 });
    });
  });

  describe("reindexToastsForPosition", () => {
    it("should set toasts index prop to to correct value for normal order", () => {
      const toast = { ...toastBase, id: "123" };
      const toast2 = { ...toastBase, id: "456" };
      const toast3 = { ...toastBase, id: "789" };
      const toast4 = { ...toastBase, id: "111" };
      const toasts = [toast2, toast3, toast4, toast];

      reindexToastsForPosition(toast, toasts);

      expect(toast.index).toEqual(0);
      expect(toast2.index).toEqual(1);
      expect(toast3.index).toEqual(2);
      expect(toast4.index).toEqual(3);
    });

    it("should set toasts index prop to to correct value for normal order", () => {
      const toast = {
        ...toastBase,
        id: "123",
        order: displayOrder.reversed,
      };
      const toast2 = {
        ...toastBase,
        id: "456",
        order: displayOrder.reversed,
      };
      const toast3 = {
        ...toastBase,
        id: "789",
        order: displayOrder.reversed,
      };
      const toast4 = {
        ...toastBase,
        id: "111",
        order: displayOrder.reversed,
      };
      const toasts = [toast2, toast3, toast4, toast];

      reindexToastsForPosition(toast, toasts);

      expect(toast.index).toEqual(3);
      expect(toast2.index).toEqual(0);
      expect(toast3.index).toEqual(1);
      expect(toast4.index).toEqual(2);
    });
  });
});
