import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { fadeIn, flipXIn } from "../src/animations/inAnimation";
import { cssClassNames, position } from "../src/constants";
import {
  setToastVisibility,
  sleepForAnimationTime,
  toggleAnimation,
  updateToastTranslate,
} from "../src/toastUtils";
import * as utils from "../src/utils";
import { toastBase } from "./mocks";

describe("toastUtils", () => {
  let toast = {
    ...toastBase,
    element: document.createElement("div"),
  };

  const getTransformOtherThanStub = vi.fn();

  beforeEach(() => {
    toast = {
      ...toastBase,
      element: document.createElement("div"),
    };

    vi.spyOn(utils, "uuid").mockReturnValue("123");
    vi.spyOn(utils, "getTransformOtherThan").mockImplementation(
      getTransformOtherThanStub
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("setToastVisibility", () => {
    it("should set the visibility of the given toast", () => {
      const toastEl = document.createElement("div");
      // const containerEl = document.createElement("div");

      // containerEl.setAttribute("data-component", "container");
      // containerEl.classList.add("toastup__toast-container");
      // toastEl.appendChild(containerEl);
      toast.element.appendChild(toastEl);

      setToastVisibility(toast, true);

      expect(toast.isVisible).toBe(true);
    });

    it("should do nothing if the given toast has no element", () => {
      const toast = { ...toastBase, element: null };
      setToastVisibility(toast, true);

      expect(toast.isVisible).toBe(false);
    });

    // it("should do nothing if for the given toast containerEl is not found", () => {
    //   const toastEl = document.createElement("div");
    //   toast.element?.appendChild(toastEl);

    //   setToastVisibility(toast, true);

    //   expect(toast.isVisible).toBe(false);
    // });
  });

  describe("updateToastTranslate", () => {
    it("should do nothing if the given toast has no element", () => {
      const toast = { ...toastBase, element: null };

      updateToastTranslate(toast, 100, 150);

      expect(getTransformOtherThanStub).not.toBeCalled();
    });

    it("should update both translate prop and style for given toast", () => {
      getTransformOtherThanStub.mockImplementation(() => "scale(1)");
      toast.position = position.topLeft;
      toast.translate = { x: 0, y: 100 };
      toast.element.style.transform = "scale(1)";

      updateToastTranslate(toast, 100, 150);

      expect(toast.translate).toEqual({ x: 100, y: 150 });
      expect(toast.element?.style.transform).toEqual(
        "translate(100px, 150px) scale(1)"
      );
    });

    it("should update only style for given toast", () => {
      getTransformOtherThanStub.mockImplementation(() => "scale(1)");
      toast.position = position.topLeft;
      toast.translate = { x: 0, y: 100 };
      toast.element.style.transform = "scale(1)";

      updateToastTranslate(toast, 100, 150, false);

      expect(toast.translate).toEqual({ x: 0, y: 100 });
      expect(toast.element?.style.transform).toEqual(
        "translate(100px, 150px) scale(1)"
      );
    });
  });

  describe("sleepForAnimationTime", () => {
    const sleepStub = vi.fn();

    beforeEach(() => {
      vi.spyOn(utils, "sleep").mockImplementation(sleepStub);
    });

    it("should call sleep function with time declared in animationTime prop", async () => {
      await sleepForAnimationTime(fadeIn);

      expect(sleepStub).toBeCalledTimes(1);
    });
  });

  describe("toggleAnimation", () => {
    it("should add class to toast container if animation contains className instead of animationName", () => {
      toast.inAnimation = flipXIn;

      const container = document.createElement("div");
      container.classList.add(cssClassNames.container);
      container.setAttribute("data-component", "container");
      const body = document.createElement("div");
      body.setAttribute("data-component", "body");
      container.appendChild(body);

      toast.element?.appendChild(container);

      toggleAnimation(toast, t => t.inAnimation, true);

      expect(container.className).toEqual(
        `${cssClassNames.container} ${flipXIn.className}`
      );
    });

    it("should add animation props to toast if animation contains animationName instead of className", () => {
      toast.inAnimation = fadeIn;

      toggleAnimation(toast, t => t.inAnimation, true);

      const toastEl = toast.element;

      expect(toastEl?.style.animationName).toEqual(fadeIn.animationName);
      expect(toastEl?.style.animationDuration).toEqual(
        `${fadeIn.animationTime}ms`
      );
      expect(toastEl?.style.animationFillMode).toEqual("forwards");
      expect(toastEl?.style.animationTimingFunction).toEqual("linear");
      expect(toastEl?.style.animationIterationCount).toEqual("1");
    });

    it("should remove animation props from toast if animation contains animationName instead of className", () => {
      toast.inAnimation = fadeIn;

      toast.element.style.animationName = `${fadeIn.animationName}`;
      toast.element.style.animationDuration = `${fadeIn.animationTime}ms`;
      toast.element.style.animationFillMode = "forwards";
      toast.element.style.animationTimingFunction = "linear";
      toast.element.style.animationIterationCount = "1";

      toggleAnimation(toast, t => t.inAnimation, false);

      const toastEl = toast.element;

      expect(toastEl?.style.animationName).toEqual("");
      expect(toastEl?.style.animationDuration).toEqual("");
      expect(toastEl?.style.animationFillMode).toEqual("");
      expect(toastEl?.style.animationTimingFunction).toEqual("");
      expect(toastEl?.style.animationIterationCount).toEqual("");
    });

    it("should set css vars if animation contains animationName and position bottomRight", () => {
      toast.inAnimation = fadeIn;
      toast.position = position.bottomRight;
      toast.translate = { x: 0, y: 200 };

      toggleAnimation(toast, t => t.inAnimation, true);

      const toastEl = toast.element;
      expect(toastEl?.style.getPropertyValue("--startTranslateX")).toEqual(
        `${toast.translate.x}px`
      );
      expect(toastEl?.style.getPropertyValue("--startTranslateY")).toEqual(
        `${toast.translate.y}px`
      );
      expect(
        toastEl?.style.getPropertyValue("--verticalPositionMultiplier")
      ).toEqual("1");
      expect(
        toastEl?.style.getPropertyValue("--horizontalPositionMultiplier")
      ).toEqual("1");
    });

    it("should set css vars if animation contains animationName and position topLeft", () => {
      toast.inAnimation = fadeIn;
      toast.position = position.topLeft;
      toast.translate = { x: 0, y: 200 };

      toggleAnimation(toast, t => t.inAnimation, true);

      const toastEl = toast.element;
      expect(toastEl?.style.getPropertyValue("--startTranslateX")).toEqual(
        `${toast.translate.x}px`
      );
      expect(toastEl?.style.getPropertyValue("--startTranslateY")).toEqual(
        `${toast.translate.y}px`
      );
      expect(
        toastEl?.style.getPropertyValue("--verticalPositionMultiplier")
      ).toEqual("-1");
      expect(
        toastEl?.style.getPropertyValue("--horizontalPositionMultiplier")
      ).toEqual("-1");
    });

    it("should do nothing if the given toast has no element", () => {
      const toast = { ...toastBase, element: null, inAnimation: flipXIn };
      const container = document.createElement("div");
      container.classList.add(cssClassNames.container);
      container.setAttribute("data-component", "container");
      const body = document.createElement("div");
      body.setAttribute("data-component", "body");
      container.appendChild(body);

      toggleAnimation(toast, t => t.inAnimation, true);

      expect(container.className).toEqual(cssClassNames.container);
    });

    it("should do nothing if animationTime is not set", () => {
      toast.inAnimation = {
        className: "test-animation-name",
        animationTime: undefined,
        type: "in" as const,
      };

      const container = document.createElement("div");
      container.classList.add(cssClassNames.container);
      container.setAttribute("data-component", "container");
      const body = document.createElement("div");
      body.setAttribute("data-component", "body");
      container.appendChild(body);

      toast.element?.appendChild(container);

      toggleAnimation(toast, t => t.inAnimation, true);

      expect(container.className).toEqual(`${cssClassNames.container}`);
    });
  });
});
