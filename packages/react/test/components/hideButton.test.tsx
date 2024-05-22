import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { HideButton } from "../../src/components/HideButton";

describe("HideButton", () => {
  it("should hide function be invoked on click", () => {
    const hideStub = vi.fn();
    const { getByLabelText } = render(
      <HideButton className="" style={{}} onClick={hideStub} />
    );

    expect(hideStub).not.toHaveBeenCalled();
    fireEvent.click(getByLabelText("close"));
    expect(hideStub).toHaveBeenCalledTimes(1);

    expect(getByLabelText("close")).not.toBeNull();
  });

  it("should have set aria-label to close", () => {
    const { getByLabelText } = render(
      <HideButton className="" style={{}} onClick={vi.fn()} />
    );

    expect(getByLabelText("close")).not.toBeNull();
  });

  it("should apply given className", () => {
    const className = "test-class-name-1 test-class-name-2";
    const { getByLabelText } = render(
      <HideButton className={className} style={{}} onClick={vi.fn()} />
    );

    expect(getByLabelText("close")).toHaveClass(className);
  });

  it("should apply given style", () => {
    const style = { background: "red" };
    const { getByLabelText } = render(
      <HideButton className="" style={style} onClick={vi.fn()} />
    );

    expect(getByLabelText("close")).toHaveStyle(style);
  });
});
