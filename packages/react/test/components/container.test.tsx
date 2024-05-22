import { render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { Container } from "../../src/components/Container";

describe("Container", () => {
  it("should render children", () => {
    const { getByLabelText } = render(
      <Container className="" style={{}}>
        <div id="inner-div">test</div>
      </Container>
    );

    expect(
      getByLabelText("container").querySelector("#inner-div")?.innerHTML
    ).toEqual("test");
  });

  it("should apply given className", () => {
    const className = "test-class-name-1 test-class-name-2";
    const { getByLabelText } = render(
      <Container className={className} style={{}}>
        <div>test</div>
      </Container>
    );

    expect(getByLabelText("container")).toHaveClass(className);
  });

  it("should apply given style", () => {
    const style = { background: "red" };
    const { getByLabelText } = render(
      <Container className="" style={style}>
        <div>test</div>
      </Container>
    );

    expect(getByLabelText("container")).toHaveStyle(style);
  });
});
