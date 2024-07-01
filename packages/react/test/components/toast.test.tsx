import { fireEvent, render } from "@testing-library/react";
import { cssClassNames, eventManager, events, type } from "@toastup/core";
import * as React from "react";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { Toast } from "../../src/components/Toast";
import { toastBase } from "../mock/mocks";

describe("Toast", () => {
  const emitStub = vi.fn();
  const eventManagerStub = {
    on: vi.fn(),
    off: vi.fn(),
    emit: emitStub,
  };

  beforeEach(() => {
    vi.spyOn(eventManager, "get").mockReturnValue(eventManagerStub);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render default body", () => {
    render(<Toast {...toastBase} title="test title" message="test message" />);

    expect(
      document.querySelector(`.${cssClassNames.toastTitle}`)?.innerHTML
    ).toEqual("test title");
    expect(
      document.querySelector(`.${cssClassNames.toastMessage}`)?.innerHTML
    ).toEqual("test message");
  });

  it("should render custom body component passed as function", () => {
    const CustomBody = () => <div aria-label="custom-body"></div>;
    const { getByLabelText } = render(
      <Toast {...toastBase} body={CustomBody} />
    );

    expect(getByLabelText("custom-body")).not.toBeNull();
  });

  it("should render custom body component passed as react node", () => {
    const CustomBody = () => <div aria-label="custom-body"></div>;

    const { getByLabelText } = render(
      <Toast {...toastBase} body={<CustomBody />} />
    );

    expect(getByLabelText("custom-body")).not.toBeNull();
  });

  it("should render custom content component passed as function", () => {
    const CustomContent = () => <div aria-label="custom-content"></div>;
    const { getByLabelText } = render(
      <Toast {...toastBase} content={CustomContent} />
    );

    expect(getByLabelText("custom-content")).not.toBeNull();
  });

  it("should render custom toast component passed as function", () => {
    const CustomToast = () => <div aria-label="custom-toast"></div>;
    const { getByLabelText } = render(
      <Toast {...toastBase} toast={CustomToast} />
    );

    expect(getByLabelText("custom-toast")).not.toBeNull();
  });

  it("should render custom hideButton component passed as function", () => {
    const CustomHideButton = () => <div aria-label="custom-close">A</div>;
    const { getByLabelText } = render(
      <Toast {...toastBase} hideButton={CustomHideButton} />
    );

    expect(getByLabelText("custom-close")).not.toBeNull();
  });

  it("should render custom icon component passed as function", () => {
    const CustomIcon = () => <div aria-label="custom-icon">A</div>;
    const { getByLabelText } = render(
      <Toast {...toastBase} icon={CustomIcon} />
    );

    expect(getByLabelText("custom-icon")).not.toBeNull();
  });

  it("should render default component if passed component is the HTMLElement", () => {
    const CustomHideButton = document.createElement("span");
    CustomHideButton.ariaLabel = "custom-close";
    const { getByLabelText } = render(
      <Toast {...toastBase} hideButton={CustomHideButton as any} />
    );

    expect(() => getByLabelText("custom-close")).toThrowError();
    expect(getByLabelText("close")).not.toBeNull();
  });

  it("should apply given className", () => {
    const className = "test-class-name-1 test-class-name-2";
    const { getByLabelText } = render(
      <Toast {...toastBase} className={className} />
    );

    expect(getByLabelText("toast")).toHaveClass(className);
  });

  it("should apply rtl className if rtl prop equals true", () => {
    const { getByLabelText } = render(<Toast {...toastBase} rtl={true} />);

    expect(getByLabelText("toast")).toHaveClass(cssClassNames.toastRtl);
  });

  it("should render Icon if showIcon prop equals true", () => {
    const { getByLabelText } = render(
      <Toast {...toastBase} showIcon={true} type={type.base} />
    );

    expect(getByLabelText("icon-base")).not.toBeNull();
  });

  it("should not render Icon if showIcon prop equals false", () => {
    const { getByLabelText } = render(
      <Toast {...toastBase} showIcon={false} type={type.base} />
    );

    expect(() => getByLabelText("icon-base")).toThrowError();
  });

  it("should render HideButton if showHideButton prop equals true", () => {
    const { getByLabelText } = render(
      <Toast {...toastBase} showHideButton={true} />
    );

    expect(getByLabelText("close")).not.toBeNull();
  });

  it("should not render HideButton if showHideButton prop equals false", () => {
    const { getByLabelText } = render(
      <Toast {...toastBase} showHideButton={false} />
    );

    expect(() => getByLabelText("close")).toThrowError();
  });

  it("should render ProgressBar if showProgress prop equals true and autoHide is greater than 0", () => {
    const { getByLabelText } = render(
      <Toast {...toastBase} showProgress={true} autoHide={1000} />
    );

    expect(getByLabelText("notification timer")).not.toBeNull();
  });

  it("should not render ProgressBar if autoHide is greater than 0 but showProgress prop equals false", () => {
    const { getByLabelText } = render(
      <Toast {...toastBase} showProgress={false} autoHide={1000} />
    );

    expect(() => getByLabelText("notification timer")).toThrowError();
  });

  it("should not render ProgressBar if showProgress prop equals true but autoHide equals to 0", () => {
    const { getByLabelText } = render(
      <Toast {...toastBase} showProgress={true} autoHide={0} />
    );

    expect(() => getByLabelText("notification timer")).toThrowError();
  });

  it("should click event be emitted on click", () => {
    const { getByLabelText } = render(<Toast {...toastBase} />);

    expect(emitStub).not.toHaveBeenCalledWith(events.click, toastBase.id);
    fireEvent.click(getByLabelText("toast"));
    expect(emitStub).toHaveBeenCalledWith(events.click, toastBase.id);
  });

  it("should hide function be invoked on click if hideOnClick equals to true", () => {
    const hideStub = vi.fn();
    const { getByLabelText } = render(
      <Toast {...toastBase} hideOnClick={true} hide={hideStub} />
    );

    expect(hideStub).not.toHaveBeenCalled();
    fireEvent.click(getByLabelText("toast"));
    expect(hideStub).toHaveBeenCalled();
  });

  it("should apply given style", () => {
    const style = { background: "red" };
    const { getByLabelText } = render(<Toast {...toastBase} style={style} />);

    expect(getByLabelText("toast")).toHaveStyle(style);
  });

  it("should pause function be invoked on mouse enter if pauseOnHover equals to true", () => {
    const pauseStub = vi.fn();
    const { getByLabelText } = render(
      <Toast {...toastBase} pauseOnHover={true} pause={pauseStub} />
    );

    expect(pauseStub).not.toHaveBeenCalled();
    fireEvent.mouseEnter(getByLabelText("toast"));
    expect(pauseStub).toHaveBeenCalled();
  });

  it("should pause function not be invoked on mouse enter if pauseOnHover equals to false", () => {
    const pauseStub = vi.fn();
    const { getByLabelText } = render(
      <Toast {...toastBase} pauseOnHover={false} pause={pauseStub} />
    );

    expect(pauseStub).not.toHaveBeenCalled();
    fireEvent.mouseEnter(getByLabelText("toast"));
    expect(pauseStub).not.toHaveBeenCalled();
  });

  it("should unpause function be invoked on mouse leave if pauseOnHover equals to true", () => {
    const unpauseStub = vi.fn();
    const { getByLabelText } = render(
      <Toast {...toastBase} pauseOnHover={true} unpause={unpauseStub} />
    );

    expect(unpauseStub).not.toHaveBeenCalled();
    fireEvent.mouseLeave(getByLabelText("toast"));
    expect(unpauseStub).toHaveBeenCalled();
  });

  it("should unpause function not be invoked on mouse leave if pauseOnHover equals to false", () => {
    const unpauseStub = vi.fn();
    const { getByLabelText } = render(
      <Toast {...toastBase} pauseOnHover={false} unpause={unpauseStub} />
    );

    expect(unpauseStub).not.toHaveBeenCalled();
    fireEvent.mouseLeave(getByLabelText("toast"));
    expect(unpauseStub).not.toHaveBeenCalled();
  });

  it("should startDragging function be invoked on touch start if dragOnMobile equals to true", () => {
    const startDraggingStub = vi.fn();
    const { getByLabelText } = render(
      <Toast
        {...toastBase}
        dragOnMobile={true}
        startDragging={startDraggingStub}
      />
    );

    expect(startDraggingStub).not.toHaveBeenCalled();
    fireEvent.touchStart(getByLabelText("toast"));
    expect(startDraggingStub).toHaveBeenCalled();
  });

  it("should startDragging function not be invoked on touch start if dragOnMobile equals to false", () => {
    const startDraggingStub = vi.fn();
    const { getByLabelText } = render(
      <Toast
        {...toastBase}
        dragOnMobile={false}
        startDragging={startDraggingStub}
      />
    );

    expect(startDraggingStub).not.toHaveBeenCalled();
    fireEvent.touchStart(getByLabelText("toast"));
    expect(startDraggingStub).not.toHaveBeenCalled();
  });

  it("should stopDragging function be invoked on touch end if dragOnMobile equals to true", () => {
    const stopDraggingStub = vi.fn();
    const { getByLabelText } = render(
      <Toast
        {...toastBase}
        dragOnMobile={true}
        stopDragging={stopDraggingStub}
      />
    );

    expect(stopDraggingStub).not.toHaveBeenCalled();
    fireEvent.touchEnd(getByLabelText("toast"));
    expect(stopDraggingStub).toHaveBeenCalled();
  });

  it("should stopDragging function not be invoked on touch end if dragOnMobile equals to false", () => {
    const stopDraggingStub = vi.fn();
    const { getByLabelText } = render(
      <Toast
        {...toastBase}
        dragOnMobile={false}
        stopDragging={stopDraggingStub}
      />
    );

    expect(stopDraggingStub).not.toHaveBeenCalled();
    fireEvent.touchEnd(getByLabelText("toast"));
    expect(stopDraggingStub).not.toHaveBeenCalled();
  });

  it("should duringDragging function be invoked on touch move if dragOnMobile equals to true", () => {
    const duringDraggingStub = vi.fn();
    const { getByLabelText } = render(
      <Toast
        {...toastBase}
        dragOnMobile={true}
        duringDragging={duringDraggingStub}
      />
    );

    expect(duringDraggingStub).not.toHaveBeenCalled();
    fireEvent.touchMove(getByLabelText("toast"));
    expect(duringDraggingStub).toHaveBeenCalled();
  });

  it("should duringDragging function not be invoked on touch move if dragOnMobile equals to false", () => {
    const duringDraggingStub = vi.fn();
    const { getByLabelText } = render(
      <Toast
        {...toastBase}
        dragOnMobile={false}
        duringDragging={duringDraggingStub}
      />
    );

    expect(duringDraggingStub).not.toHaveBeenCalled();
    fireEvent.touchMove(getByLabelText("toast"));
    expect(duringDraggingStub).not.toHaveBeenCalled();
  });

  it("should hide function be invoked on HideButton click", () => {
    const hideStub = vi.fn();
    const { getByLabelText } = render(<Toast {...toastBase} hide={hideStub} />);

    expect(hideStub).not.toHaveBeenCalled();
    fireEvent.click(getByLabelText("close"));
    expect(hideStub).toHaveBeenCalled();
  });
});
