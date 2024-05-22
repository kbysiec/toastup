import { render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "../../src/components/ProgressBar";

describe("ProgressBar", () => {
  it("should have set aria-label to notification timer", () => {
    const { getByLabelText } = render(<ProgressBar className="" style={{}} />);

    expect(getByLabelText("notification timer")).not.toBeNull();
  });

  it("should have set role to progressbar", () => {
    const { getByRole } = render(<ProgressBar className="" style={{}} />);

    expect(getByRole("progressbar")).not.toBeNull();
  });

  it("should apply given className", () => {
    const className = "test-class-name-1 test-class-name-2";
    const { getByLabelText } = render(
      <ProgressBar className={className} style={{}} />
    );

    expect(getByLabelText("notification timer").firstChild).toHaveClass(
      className
    );
  });

  it("should apply given style", () => {
    const style = { background: "red" };
    const { getByLabelText } = render(
      <ProgressBar className="" style={style} />
    );

    expect(getByLabelText("notification timer").firstChild).toHaveStyle(style);
  });
});
