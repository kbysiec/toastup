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
import {
  add,
  executeToastCallback,
  getDefaultConfig,
  getToastPropsForCreate,
  pause,
  registerToastupEventHandlers,
  remove,
  unpause,
} from "../src/toast";
import { toastQueue } from "../src/toastQueue";
import { PartialBy, ToastConfig, ToastEntity } from "../src/types";
import * as utils from "../src/utils";
import { toastBase } from "./mocks";

describe("toast", () => {
  const emitStub = vi.fn();
  const onStub = vi.fn();
  const offStub = vi.fn();

  let queue: Map<string, ToastEntity>;

  beforeEach(() => {
    queue = new Map<string, ToastEntity>();

    vi.spyOn(eventManager, "on").mockImplementation(onStub);
    vi.spyOn(eventManager, "off").mockImplementation(offStub);
    vi.spyOn(eventManager, "emit").mockImplementation(emitStub);
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
    it("should emit event for removing toast", () => {
      add({ id: "11" });
      add({ id: "22" });

      remove("11");

      expect(emitStub).toBeCalledWith(events.remove, {
        toastId: "11",
        withAnimation: true,
      });
    });
  });

  describe("getToastPropsForCreate", () => {
    it("should return toast props necessary for getting toast", () => {
      const config: ToastConfig = {
        id: "123",
        message: "Awesome 🎉",
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

  describe("pause", () => {
    it("should set toast autoHideDetails isPaused property to true", () => {
      const toast = {
        ...toastBase,
        autoHideDetails: { isPaused: false, timeVisible: 0 },
      };
      queue.set(toast.id, toast);

      pause(toast.id);

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

      unpause(toast.id);

      expect(toast.autoHideDetails.isPaused).toBe(false);
    });

    it("should do nothing if there isn't toast in the queue for given id", () => {
      const toast = {
        ...toastBase,
        autoHideDetails: { isPaused: true, timeVisible: 0 },
      };
      queue.set("999", toast);

      unpause(toast.id);

      expect(toast.autoHideDetails.isPaused).toBe(true);
    });
  });

  describe("getDefaultConfig", () => {
    it("should return default config for toast", () => {
      const defaultConfig: PartialBy<ToastConfig, "id"> = getDefaultConfig();
      const expectedConfig: PartialBy<ToastConfig, "id"> = {
        id: "123",
        message: "Awesome 🎉",
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

  describe("executeToastCallback", () => {
    it("should execute chosen toast callback", () => {
      const stub = vi.fn();
      const toast = { ...toastBase, onHide: stub };

      executeToastCallback(toast, t => t.onHide);

      expect(stub).toBeCalledTimes(1);
    });
  });

  describe("registerToastupEventHandlers", () => {
    it("should register 4 event listeners", () => {
      registerToastupEventHandlers();

      expect(onStub).toHaveBeenCalledTimes(5);
    });
  });
});
