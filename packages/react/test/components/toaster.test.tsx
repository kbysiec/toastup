import { render } from "@testing-library/react";
import { toastQueue } from "@toastup/core";
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
import { Toaster } from "../../src/components/Toaster";
import { toastBase } from "../mock/mocks";

describe("Toast", () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render nothing if toastQueue is empty", () => {
    vi.spyOn(toastQueue, "get").mockImplementation(() => new Map());

    const { baseElement } = render(<Toaster />);
    expect(baseElement.querySelector(".toaster")).not.toBeNull();
    expect(baseElement.querySelector(".toaster")?.childNodes.length).toEqual(0);
  });

  it("should render toast components inside queue", () => {
    const queue = new Map([]);
    vi.spyOn(toastQueue, "get").mockImplementation(
      () => new Map([[toastBase.id, toastBase]])
    );

    const { baseElement } = render(<Toaster />);
    expect(baseElement.querySelector(".toaster")).not.toBeNull();
    expect(baseElement.querySelector(".toaster")?.childNodes.length).toEqual(1);
  });
});
