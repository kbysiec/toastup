import { render } from "@testing-library/react";
import { type } from "@toastup/core";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { Icon } from "../../src/components/Icon";

describe("Icon", () => {
  it("should have set role to img", () => {
    const { getByRole } = render(
      <Icon type={type.base} className="" style={{}} />
    );

    expect(getByRole("img")).not.toBeNull();
  });

  it("should apply given className", () => {
    const className = "test-class-name-1 test-class-name-2";
    const { getByRole } = render(
      <Icon type={type.base} className={className} style={{}} />
    );

    expect(getByRole("img")).toHaveClass(className);
  });

  it("should apply given stroke and fill", () => {
    const style = { stroke: "red", fill: "blue" };
    const { getByRole } = render(
      <Icon type={type.base} className="" style={style} />
    );

    expect(getByRole("img").querySelector("ellipse")).toHaveStyle({
      fill: style.fill,
    });
    expect(getByRole("img").querySelector("path")).toHaveStyle({
      stroke: style.stroke,
    });
  });

  it("should render base icon", () => {
    const { getByLabelText } = render(
      <Icon type={type.base} className="" style={{}} />
    );

    expect(getByLabelText("icon-base")).not.toBeNull();
  });

  it("should render success icon", () => {
    const { getByLabelText } = render(
      <Icon type={type.success} className="" style={{}} />
    );

    expect(getByLabelText("icon-success")).not.toBeNull();
  });

  it("should render info icon", () => {
    const { getByLabelText } = render(
      <Icon type={type.info} className="" style={{}} />
    );

    expect(getByLabelText("icon-info")).not.toBeNull();
  });

  it("should render warning icon", () => {
    const { getByLabelText } = render(
      <Icon type={type.warning} className="" style={{}} />
    );

    expect(getByLabelText("icon-warning")).not.toBeNull();
  });

  it("should render error icon", () => {
    const { getByLabelText } = render(
      <Icon type={type.error} className="" style={{}} />
    );

    expect(getByLabelText("icon-error")).not.toBeNull();
  });
});
