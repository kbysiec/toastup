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
import { slideHorizontalWithFadeInBody } from "../../src/animations/inBodyAnimation";
import {
  displayOrder,
  events,
  measureType,
  position,
} from "../../src/constants";
import {
  animateBodyIfApplicable,
  getStartTranslateYForReversedOrder,
  handleShowToast,
  setMeasure,
  setToastAutoHide,
  show,
} from "../../src/handlers/showHandler";
import * as toast from "../../src/toast";
import * as toastPositionManager from "../../src/toastPositionManager";
import { toastQueue } from "../../src/toastQueue";
import * as toastUtils from "../../src/toastUtils";
import { ToastEntity } from "../../src/types";
import * as utils from "../../src/utils";
import { toastBase } from "../mocks";

describe("showHandler", () => {
  let queue: Map<string, ToastEntity>;

  beforeEach(() => {
    queue = new Map<string, ToastEntity>();
    vi.spyOn(toastQueue, "get").mockReturnValue(queue);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("setMeasure", () => {
    it("should set the height dimension of the given toast", () => {
      vi.spyOn(utils, "getOuter").mockReturnValue(50);
      const toast = {
        ...toastBase,
        element: document.createElement("div"),
      };

      const height = 50;
      if (toast.element) {
        vi.spyOn(toast.element, "offsetHeight", "get").mockReturnValue(height);
      }

      setMeasure(toast, measureType.height);

      expect(toast.dimensions.height).toBe(height);
    });

    it("should do nothing if the given toast has no element", () => {
      const toast = { ...toastBase, element: null };
      toast.dimensions.height = 0;

      setMeasure(toast, measureType.height);

      expect(toast.dimensions.height).toBe(0);
    });
  });

  describe("getStartTranslateYForReversedOrder", () => {
    it("should return the value of the translateY which points above the last toast for bottom position", () => {
      const toast = { ...toastBase };
      const toast2 = {
        ...toastBase,
        translate: { x: 0, y: 0 },
        dimensions: { height: 50, width: 150 },
      };
      const toast3 = {
        ...toastBase,
        translate: { x: 0, y: -100 },
        dimensions: { height: 50, width: 150 },
      };
      const toasts = [toast2, toast3];

      const translateY = getStartTranslateYForReversedOrder(toast, toasts);

      expect(translateY).toEqual(-150);
    });

    it("should return the value of the translateY which points above the last toast for top position", () => {
      const toast = { ...toastBase, position: position.topRight };
      const toast2 = {
        ...toastBase,
        position: position.topRight,
        translate: { x: 0, y: 0 },
        dimensions: { height: 50, width: 150 },
      };
      const toast3 = {
        ...toastBase,
        position: position.topRight,
        translate: { x: 0, y: 100 },
        dimensions: { height: 50, width: 150 },
      };
      const toast4 = {
        ...toastBase,
        translate: { x: 0, y: -100 },
        dimensions: { height: 50, width: 150 },
      };
      const toasts = [toast2, toast3, toast4];

      const translateY = getStartTranslateYForReversedOrder(toast, toasts);

      expect(translateY).toEqual(150);
    });

    it("should return the value of the translateY which equals for translateY of the last toast", () => {
      const toast = { ...toastBase };
      const toast2 = {
        ...toastBase,
        translate: { x: 0, y: 0 },
        dimensions: { height: 50, width: 150 },
      };
      const toast3 = {
        ...toastBase,
        translate: { x: 0, y: -100 },
        dimensions: { height: 50, width: 150 },
      };
      const toast4 = {
        ...toastBase,
        translate: { x: 0, y: 100 },
        dimensions: { height: 50, width: 150 },
      };
      const toasts = [toast2, toast3, toast4];

      const translateY = getStartTranslateYForReversedOrder(
        toast,
        toasts,
        true
      );

      expect(translateY).toEqual(-100);
    });

    it("should return the value of the translateY of given toast if there isn't any other toast", () => {
      const toast = { ...toastBase };
      const toasts = [];

      const translateY = getStartTranslateYForReversedOrder(
        toast,
        toasts,
        true
      );

      expect(translateY).toEqual(0);
    });
  });

  describe("setToastAutoHide", () => {
    const getTimeSpy = vi.spyOn(Date.prototype, "getTime");
    let toast = {
      ...toastBase,
      element: document.createElement("div"),
    };

    beforeEach(() => {
      toast = {
        ...toastBase,
        element: document.createElement("div"),
      };
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should do nothing if toast autoHide property is set to 0", () => {
      toast.autoHide = 0;

      setToastAutoHide(toast);
      vi.advanceTimersByTime(17);

      expect(getTimeSpy).toBeCalledTimes(0);
    });

    it("should calculate the remaining time every 16.6ms if toast autoHide property is greater than 0", () => {
      toast.autoHide = 1000;

      setToastAutoHide(toast);
      vi.advanceTimersByTime(1000);

      expect(getTimeSpy).toBeCalledTimes(63);
    });

    it("should invoke hide method if toast autoHideDetails.timeVisible property is greater than autoHide property", () => {
      const hideStub = vi.fn();
      toast.hide = hideStub;
      toast.autoHide = 1000;

      setToastAutoHide(toast);
      vi.advanceTimersByTime(1100);

      expect(hideStub).toBeCalled();
    });
  });

  describe("animateBodyIfApplicable", () => {
    let toast = {
      ...toastBase,
      element: document.createElement("div"),
      bodyAnimation: slideHorizontalWithFadeInBody,
      animateBody: true,
    };

    beforeEach(() => {
      toast = {
        ...toastBase,
        element: document.createElement("div"),
        bodyAnimation: slideHorizontalWithFadeInBody,
        animateBody: true,
      };
      vi.useFakeTimers();
    });

    it("should add animation class if toast animateBody prop is true", async () => {
      vi.spyOn(utils, "sleep").mockImplementation(() => Promise.resolve());

      toast.animateBody = true;
      const body = document.createElement("div");
      body.setAttribute("data-component", "body");
      toast.element?.appendChild(body);

      await animateBodyIfApplicable(toast);

      expect(body.style.animationName).toEqual(
        slideHorizontalWithFadeInBody.animationName
      );
    });

    it("should do nothing if toast animateBody prop is false", async () => {
      toast.animateBody = false;
      const body = document.createElement("div");
      body.setAttribute("data-component", "body");
      toast.element?.appendChild(body);

      await animateBodyIfApplicable(toast);

      expect(body.style.animationName).toEqual("");
    });
  });

  describe("show", () => {
    const toggleAnimationStub = vi.fn();
    const repositionToastsStub = vi.fn();
    const toggleToastsRepositionTransitionStub = vi.fn();
    const sleepForAnimationTimeStub = vi.fn();
    const executeToastCallbackStub = vi.fn();
    const getToastsForRepositionStub = vi.fn();
    const assureToastsPositionStub = vi.fn();
    const setToastVisibilityStub = vi.fn();
    const sleepStub = vi.fn();
    const updateToastTranslateStub = vi.fn();

    beforeEach(() => {
      const toast2 = {
        ...toastBase,
        id: "2",
        uuid: "2",
      };
      queue.set(toast2.id, toast2);

      vi.spyOn(toastPositionManager, "repositionToasts").mockImplementation(
        repositionToastsStub
      );
      vi.spyOn(
        toastPositionManager,
        "toggleToastsRepositionTransition"
      ).mockImplementation(toggleToastsRepositionTransitionStub);
      vi.spyOn(toastPositionManager, "getToastsForReposition")
        .mockImplementation(getToastsForRepositionStub)
        .mockReturnValue(Array.from(queue.values()));
      vi.spyOn(toastPositionManager, "assureToastsPosition").mockImplementation(
        assureToastsPositionStub
      );
      vi.spyOn(toastUtils, "sleepForAnimationTime").mockImplementation(
        sleepForAnimationTimeStub
      );
      vi.spyOn(toastUtils, "setToastVisibility").mockImplementation(
        setToastVisibilityStub
      );
      vi.spyOn(toastUtils, "updateToastTranslate").mockImplementation(
        updateToastTranslateStub
      );
      vi.spyOn(toastUtils, "toggleAnimation").mockImplementation(
        toggleAnimationStub
      );
      vi.spyOn(toast, "executeToastCallback").mockImplementation(
        executeToastCallbackStub
      );
      vi.spyOn(utils, "sleep").mockImplementation(sleepStub);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should show toast with animation with reposition if displayOrder is normal", async () => {
      const toast = {
        ...toastBase,
        order: displayOrder.normal,
        delayBeforeShow: 100,
      };

      await show(toast);

      expect(repositionToastsStub).toBeCalled();
      expect(sleepStub).toBeCalled();
      expect(toggleAnimationStub).toBeCalledTimes(2);
    });

    it("should show toast with animation without reposition if displayOrder is reversed", async () => {
      vi.spyOn(toastPositionManager, "getToastsForReposition")
        .mockImplementation(getToastsForRepositionStub)
        .mockReturnValue([]);

      const toast = {
        ...toastBase,
        delayBeforeShow: 1,
        order: displayOrder.reversed,
      };

      await show(toast);

      expect(toggleAnimationStub).toBeCalledTimes(2);
      expect(repositionToastsStub).not.toBeCalled();
    });

    it("should animate body if animateBody is true and displayOrder is normal", async () => {
      const toast = {
        ...toastBase,
        order: displayOrder.normal,
        animateBody: true,
      };

      await show(toast);

      expect(toggleAnimationStub).toBeCalledTimes(4);
    });

    it("should animate body if animateBody is true and displayOrder is reversed", async () => {
      const toast = {
        ...toastBase,
        order: displayOrder.reversed,
        animateBody: true,
      };

      await show(toast);

      expect(toggleAnimationStub).toBeCalledTimes(4);
    });
  });

  describe("handleShowToast", () => {
    const registerStub = vi.fn();

    beforeEach(() => {
      vi.spyOn(actionManager, "register").mockImplementation(registerStub);
    });

    it("should add action related to showing new toast", async () => {
      const toast = {
        ...toastBase,
      };

      const event = new CustomEvent<ToastEntity>(events.show, {
        detail: toast,
      });

      await handleShowToast(event);

      expect(registerStub).toBeCalled();
    });
  });
});
