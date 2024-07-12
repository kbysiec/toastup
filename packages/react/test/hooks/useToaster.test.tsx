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

describe("useToaster", () => {
  // const onStub = vi.fn();
  // const offStub = vi.fn();
  // const emitStub = vi.fn();
  // const eventManagerStub = {
  //   on: onStub,
  //   off: offStub,
  //   emit: emitStub,
  // };

  beforeEach(() => {
    // vi.spyOn(eventManager, "get").mockReturnValue(eventManagerStub);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should return unique toasterId", () => {
    const { result } = renderHook(() => useToaster({}));

    expect(result.current.toasterDOMId).toContain("toaster-");
  });

  it("should toaster element with given toasterId be loaded", () => {
    const { result } = renderHook(() => useToaster({}));

    expect(result.current.toasterDOMId).toContain("toaster-");
    expect(result.current.isLoaded).toEqual(true);
  });

  // it("should 'added' event be emitted", () => {
  //   const eventMgr = eventManager.get();
  //   eventMgr.emit(reactEvents.add, {});
  //   expect(emitStub).toBeCalledWith(reactEvents.added, {});
  // });
});
