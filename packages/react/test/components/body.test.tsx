import { render } from "@testing-library/react";
import { cssClassNames } from "@toastup/core";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { Body } from "../../src/components/Body";

describe("Body", () => {
  it("should render children", () => {
    const { getByRole } = render(
      <Body className="" style={{}} shouldAnimate={false} role="alert">
        <div id="inner-div">test</div>
      </Body>
    );

    expect(getByRole("alert").querySelector("#inner-div")?.innerHTML).toEqual(
      "test"
    );
  });

  it("should have set role to alert", () => {
    const { getByRole } = render(
      <Body className="" style={{}} shouldAnimate={false} role="alert">
        <div>test</div>
      </Body>
    );

    expect(getByRole("alert")).not.toBeNull();
  });

  it("should apply given className", () => {
    const className = "test-class-name-1 test-class-name-2";
    const { getByRole } = render(
      <Body className={className} style={{}} shouldAnimate={false} role="alert">
        <div>test</div>
      </Body>
    );

    expect(getByRole("alert")).toHaveClass(className);
  });

  it("should apply given style", () => {
    const style = { background: "red" };
    const { getByRole } = render(
      <Body className="" style={style} shouldAnimate={false} role="alert">
        <div>test</div>
      </Body>
    );

    expect(getByRole("alert")).toHaveStyle(style);
  });

  it("should have body visible class name if shouldAnimate is set to false", () => {
    const { getByRole } = render(
      <Body className="" style={{}} shouldAnimate={false} role="alert">
        <div>test</div>
      </Body>
    );

    expect(
      getByRole("alert").classList.contains(cssClassNames.bodyVisible)
    ).toBeTruthy();
  });

  it("should doesn't have body visible class name if shouldAnimate is set to true", () => {
    const { getByRole } = render(
      <Body className="" style={{}} shouldAnimate={true} role="alert">
        <div>test</div>
      </Body>
    );

    expect(
      getByRole("alert").classList.contains(cssClassNames.bodyVisible)
    ).not.toBeTruthy();
  });
});
