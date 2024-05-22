import { render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { Content } from "../../src/components/Content";

describe("Content", () => {
  it("should render children", () => {
    const { getByLabelText } = render(
      <Content className="" style={{}}>
        <div id="inner-div">test</div>
      </Content>
    );

    expect(
      getByLabelText("content").querySelector("#inner-div")?.innerHTML
    ).toEqual("test");
  });

  it("should apply given className", () => {
    const className = "test-class-name-1 test-class-name-2";
    const { getByLabelText } = render(
      <Content className={className} style={{}}>
        <div>test</div>
      </Content>
    );

    expect(getByLabelText("content")).toHaveClass(className);
  });

  it("should apply given style", () => {
    const style = { background: "red" };
    const { getByLabelText } = render(
      <Content className="" style={style}>
        <div>test</div>
      </Content>
    );

    expect(getByLabelText("content")).toHaveStyle(style);
  });
});
