import { renderHook } from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useToaster } from "../../src/hooks";

describe("Toast", () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should return unique toasterId", () => {
    const { result } = renderHook(() => useToaster({}));

    expect(result.current.toasterId).toContain("toaster-");
  });

  it("should toaster element with given toasterId be loaded", () => {
    const { result } = renderHook(() => useToaster({}));

    expect(result.current.toasterId).toContain("toaster-");
    expect(result.current.isLoaded).toEqual(true);
  });
});
