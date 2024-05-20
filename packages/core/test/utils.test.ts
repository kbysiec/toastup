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
import {
  animationType,
  displayOrder,
  measureType,
  position,
  theme,
  type,
} from "../src/constants";
import { AnimationBase, Config } from "../src/types";
import {
  getCoalesced,
  getOuter,
  getTransformOtherThan,
  groupBy,
  sleep,
  uuid,
} from "../src/utils";

describe("utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("uuid", () => {
    it("should return UUID with correct format", () => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|a|b][0-9a-f]{3}-[0-9a-f]{12}$/;
      const result = uuid();
      expect(result).toMatch(uuidRegex);
    });
  });

  describe("getOuter", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    beforeEach(() => {
      vi.spyOn(element, "offsetWidth", "get").mockReturnValue(100);
      vi.spyOn(element, "offsetHeight", "get").mockReturnValue(100);
    });

    it("should return total offsetWidth including top and bottom margins if margin value is valid", () => {
      element.style.margin = "10px";

      expect(getOuter(element, measureType.width)).toBe(120);
    });

    it("should return total offsetHeight including top and bottom margins if margin value is valid", () => {
      element.style.margin = "10px";

      expect(getOuter(element, measureType.height)).toBe(120);
    });

    it("should return total offsetHeight skipping top and bottom margins values if margin value is invalid", () => {
      element.style.margin = "";

      expect(getOuter(element, measureType.height)).toBe(100);
    });
  });

  describe("groupBy", () => {
    const animations: AnimationBase[] = [
      { type: animationType.body, animationTime: 100 },
      { type: animationType.in, animationTime: 200 },
      { type: animationType.body, animationTime: 300 },
      { type: animationType.in, animationTime: 400 },
      { type: animationType.in, animationTime: 500 },
    ];

    it("should group items correctly by key", () => {
      const result = groupBy(animations, animation => animation.type);
      expect(result).toEqual({
        [animationType.body]: [
          { type: animationType.body, animationTime: 100 },
          { type: animationType.body, animationTime: 300 },
        ],
        [animationType.in]: [
          { type: animationType.in, animationTime: 200 },
          { type: animationType.in, animationTime: 400 },
          { type: animationType.in, animationTime: 500 },
        ],
      });
    });

    it("should return an empty object if the input list is empty", () => {
      const animations: AnimationBase[] = [];
      const result = groupBy(animations, animation => animation.type);
      expect(result).toEqual({});
    });
  });

  describe("sleep", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it("should sleep for 1s and call spy function", async () => {
      const stub = vi.fn();
      sleep(1000).then(stub);
      vi.advanceTimersByTime(999);
      await Promise.resolve(); // let any pending callbacks in PromiseJobs run
      expect(stub).not.toBeCalled();
      vi.advanceTimersByTime(1);
      await Promise.resolve();
      expect(stub).toHaveBeenCalledTimes(1);
    });
  });

  describe("getTransformOtherThan", () => {
    const element = document.createElement("div");

    it("should return transform other than translate from HTMLElement", () => {
      element.style.transform =
        "translate(-200px, 100px) rotateX(180deg) rotateY(180deg)";
      expect(getTransformOtherThan(element, "translate")).toBe(
        "rotateX(180deg) rotateY(180deg)"
      );
    });

    it("should return empty string if transform is not set on HTMLElement", () => {
      element.style.transform =
        "translate(-200px, 100px) rotateX(180deg) rotateY(180deg)";
      expect(getTransformOtherThan(element, "translate")).toBe(
        "rotateX(180deg) rotateY(180deg)"
      );
    });
  });

  describe("getCoalesced", () => {
    it("should return combined config", () => {
      const defaultConfig: Config = {
        id: "123",
        message: "Test message",
        title: "Test title",
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
        role: "alert",
        iconStyle: {},
        hideButtonStyle: {},
        contentStyle: {},
        containerStyle: {},
        bodyStyle: {},
        progressBarStyle: {},
        style: {},
        animateBody: false,
        rtl: false,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        dragOnMobile: true,
        removeOnDraggingPercent: 70,
        theme: theme.light,
        onShowing: undefined,
        onHiding: () => console.log("onHiding"),
        onShow: undefined,
        onHide: undefined,
        onClick: undefined,
      };

      const overriddenConfig = {
        id: "99",
        bodyClassName: "test-body-class-name",
        onHiding: () => console.log("onHiding overridden"),
        onShow: () => console.log("onShow"),
      };
      const coalescedConfig = getCoalesced(defaultConfig, overriddenConfig);

      expect(coalescedConfig).toEqual(
        Object.assign(defaultConfig, overriddenConfig)
      );
    });
  });
});
