import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { slideVerticallyIn } from "../src/animations/inAnimation";
import { slideHorizontalWithFadeInBody } from "../src/animations/inBodyAnimation";
import { slideVerticallyOut } from "../src/animations/outAnimation";
import { displayOrder, events, position, theme, type } from "../src/constants";
import { eventManager } from "../src/eventManager";
import * as hideHandler from "../src/handlers/hideHandler";
import {
  add,
  getDefaultConfig,
  getToastPropsForCreate,
  pause,
  registerToastupEventHandlers,
  remove,
  unpause,
} from "../src/toast";
import { toastQueue } from "../src/toastQueue";
import { PartialBy, ToastEntity, ToastProps } from "../src/types";
import * as utils from "../src/utils";
import { toastBase } from "./mocks";

describe("toast", () => {
  const onStub = vi.fn();
  const offStub = vi.fn();
  const emitStub = vi.fn();
  const eventManagerStub = {
    on: onStub,
    off: offStub,
    emit: emitStub,
  };

  let queue: Map<string, ToastEntity>;

  beforeEach(() => {
    queue = new Map<string, ToastEntity>();

    vi.spyOn(eventManager, "get").mockReturnValue(eventManagerStub);
    vi.spyOn(utils, "uuid").mockReturnValue("123");
    vi.spyOn(toastQueue, "get").mockReturnValue(queue);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("add", () => {
    it("should emit event for adding new toast", () => {
      add({ id: "11" });

      expect(emitStub).toBeCalledWith(events.add, { id: "11" });
    });

    it("should get random id if not provided in config", () => {
      add();

      expect(emitStub).toBeCalledWith(events.add, { id: "123" });
    });
  });

  describe("remove", () => {
    const hideAllToastsImmediatelyStub = vi.fn();

    beforeEach(() => {
      vi.spyOn(hideHandler, "hideAllToastsImmediately").mockImplementation(
        hideAllToastsImmediatelyStub
      );
    });

    it("should emit event for removing toast if id is provided", () => {
      const callbackStub = vi.fn();
      remove({
        toastId: "11",
        callback: callbackStub,
      });

      expect(emitStub).toBeCalledWith(events.hide, {
        toastId: "11",
        withAnimation: true,
        callback: callbackStub,
      });
    });

    it("should emit event for removing all toasts if id is not provided and withAnimation equals to true", () => {
      const toast = { ...toastBase, id: "1" };
      const toast2 = { ...toastBase, id: "2" };

      queue.set("1", toast);
      queue.set("2", toast2);

      remove();

      expect(emitStub).toBeCalledWith(events.removeAll, {
        withAnimation: true,
      });
      expect(hideAllToastsImmediatelyStub).not.toBeCalled();
    });

    it("should hideAllToastsImmediately method be invoked if id is not provided and withAnimation equals to false", () => {
      const toast = { ...toastBase, id: "1" };
      const toast2 = { ...toastBase, id: "2" };

      queue.set("1", toast);
      queue.set("2", toast2);

      remove({ withAnimation: false });

      expect(emitStub).not.toBeCalled();
      expect(hideAllToastsImmediatelyStub).toHaveBeenCalledOnce();
    });
  });

  describe("pause", () => {
    const pauseStub = vi.fn();

    it("should pause function be invoked for toast for given id", () => {
      const toast = {
        ...toastBase,
        id: "1",
        exceedVisibleToastsLimit: false,
        pause: pauseStub,
      };
      queue.set("1", toast);

      pause("1");

      expect(pauseStub).toHaveBeenCalledOnce();
    });

    it("should do nothing if there isn't toast for given id", () => {
      const toast = {
        ...toastBase,
        id: "1",
        exceedVisibleToastsLimit: false,
        pause: pauseStub,
      };
      queue.set("1", toast);

      pause("12");

      expect(pauseStub).not.toHaveBeenCalledOnce();
    });

    it("should pause function be invoked for all visible toasts", () => {
      const pauseStub2 = vi.fn();
      const pauseStub3 = vi.fn();

      const toast = {
        ...toastBase,
        id: "1",
        exceedVisibleToastsLimit: false,
        pause: pauseStub,
      };
      const toast2 = {
        ...toastBase,
        id: "2",
        exceedVisibleToastsLimit: false,
        pause: pauseStub2,
      };
      const toast3 = {
        ...toastBase,
        id: "3",
        exceedVisibleToastsLimit: true,
        pause: pauseStub3,
      };
      queue.set("1", toast);
      queue.set("2", toast2);
      queue.set("3", toast3);

      pause();

      expect(pauseStub).toHaveBeenCalledOnce();
      expect(pauseStub2).toHaveBeenCalledOnce();
      expect(pauseStub3).not.toHaveBeenCalledOnce();
    });
  });

  describe("unpause", () => {
    const unpauseStub = vi.fn();

    it("should unpause function be invoked for toast for given id", () => {
      const toast = {
        ...toastBase,
        id: "1",
        exceedVisibleToastsLimit: false,
        unpause: unpauseStub,
      };
      queue.set("1", toast);

      unpause("1");

      expect(unpauseStub).toHaveBeenCalledOnce();
    });

    it("should do nothing if there isn't toast for given id", () => {
      const toast = {
        ...toastBase,
        id: "1",
        exceedVisibleToastsLimit: false,
        unpause: unpauseStub,
      };
      queue.set("1", toast);

      unpause("12");

      expect(unpauseStub).not.toHaveBeenCalledOnce();
    });

    it("should unpause function be invoked for all visible toasts", () => {
      const unpauseStub2 = vi.fn();
      const unpauseStub3 = vi.fn();

      const toast = {
        ...toastBase,
        id: "1",
        exceedVisibleToastsLimit: false,
        unpause: unpauseStub,
      };
      const toast2 = {
        ...toastBase,
        id: "2",
        exceedVisibleToastsLimit: false,
        unpause: unpauseStub2,
      };
      const toast3 = {
        ...toastBase,
        id: "3",
        exceedVisibleToastsLimit: true,
        unpause: unpauseStub3,
      };
      queue.set("1", toast);
      queue.set("2", toast2);
      queue.set("3", toast3);

      unpause();

      expect(unpauseStub).toHaveBeenCalledOnce();
      expect(unpauseStub2).toHaveBeenCalledOnce();
      expect(unpauseStub3).not.toHaveBeenCalledOnce();
    });
  });

  describe("getToastPropsForCreate", () => {
    it("should return toast props necessary for getting toast", () => {
      const config: ToastProps = {
        id: "123",
        toasterId: undefined,
        message: "Have a good day 🙂",
        title: type.base,
        position: position.bottomRight,
        type: type.base,
        order: displayOrder.normal,
        inAnimation: slideVerticallyIn,
        inBodyAnimation: slideHorizontalWithFadeInBody,
        outAnimation: slideVerticallyOut,
        hideOnClick: true,
        autoHide: 3000,
        delayBeforeShow: 0,
        showProgress: true,
        showIcon: true,
        showHideButton: true,
        iconClassName: "",
        hideButtonClassName: "",
        contentClassName: "",
        containerClassName: "",
        bodyClassName: "",
        progressBarClassName: "",
        className: "",
        animateBody: false,
        rtl: false,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        dragOnMobile: true,
        removeOnDraggingPercent: 70,
        theme: theme.light,
        visibleToasts: 0,
        iconStyle: {},
        hideButtonStyle: {},
        contentStyle: {},
        containerStyle: {},
        bodyStyle: {},
        progressBarStyle: {},
        style: {},
        role: "alert",
        onShowing: undefined,
        onHiding: undefined,
        onShow: undefined,
        onHide: undefined,
        onClick: undefined,
      };

      const expectedProps = {
        element: null,
        uuid: "123",
        duringRemoval: false,
        isVisible: false,
        index: -1,
        dimensions: { height: -1, width: -1 },
        translate: { y: 0, x: 0 },
        autoHideDetails: {
          isPaused: false,
          timeVisible: 0,
        },
        dragDetails: {
          start: 0,
          x: 0,
          delta: 0,
          removalDistance: 0,
          shouldHandleDragMove: false,
          isMouseOver: false,
          wasMoved: false,
        },
      };
      const props = getToastPropsForCreate(config);

      expect(props).toEqual(expect.objectContaining(expectedProps));
    });
  });

  describe("getDefaultConfig", () => {
    it("should return default config for toast", () => {
      const defaultConfig: PartialBy<ToastProps, "id"> = getDefaultConfig();
      const expectedConfig: PartialBy<ToastProps, "id"> = {
        id: "123",
        toasterId: undefined,
        message: "Have a good day 🙂",
        title: type.base,
        position: position.bottomRight,
        type: type.base,
        order: displayOrder.normal,
        inAnimation: slideVerticallyIn,
        inBodyAnimation: slideHorizontalWithFadeInBody,
        outAnimation: slideVerticallyOut,
        hideOnClick: true,
        autoHide: 3000,
        delayBeforeShow: 0,
        showProgress: true,
        showIcon: true,
        showHideButton: true,
        iconClassName: "",
        hideButtonClassName: "",
        contentClassName: "",
        containerClassName: "",
        bodyClassName: "",
        progressBarClassName: "",
        className: "",
        animateBody: false,
        rtl: false,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        dragOnMobile: true,
        removeOnDraggingPercent: 70,
        theme: theme.light,
        visibleToasts: 0,
        iconStyle: {},
        hideButtonStyle: {},
        contentStyle: {},
        containerStyle: {},
        bodyStyle: {},
        progressBarStyle: {},
        style: {},
        role: "alert",
        onShowing: undefined,
        onHiding: undefined,
        onShow: undefined,
        onHide: undefined,
        onClick: undefined,
      };

      const defaultConfigId = defaultConfig.id as string;
      delete defaultConfig.id;

      const expectedConfigId = expectedConfig.id as string;
      delete expectedConfig.id;

      expect(defaultConfigId.length).toBe(expectedConfigId.length);
      expect(defaultConfig).toEqual(expectedConfig);
    });
  });

  describe("registerToastupEventHandlers", () => {
    it("should register 6 event listeners", () => {
      registerToastupEventHandlers();

      expect(onStub).toHaveBeenCalledTimes(6);
    });
  });
});
