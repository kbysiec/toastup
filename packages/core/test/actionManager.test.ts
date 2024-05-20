import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { register } from "../src/actionManager";
import { actionType } from "../src/constants";
import { Action } from "../src/types";

describe("actionManager", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("register", () => {
    it("should add two actions to queue, execute it in appropriate order", async () => {
      const stub1 = vi
        .fn()
        .mockImplementation(
          () => new Promise(resolve => setTimeout(resolve, 1000))
        );
      const action1: Action = {
        actionType: actionType.add,
        fn: stub1,
      };

      const stub2 = vi.fn();
      const action2: Action = {
        actionType: actionType.add,
        fn: stub2,
      };

      register(action1);
      register(action2);

      vi.advanceTimersByTime(999);
      await Promise.resolve(); // let any pending callbacks in PromiseJobs run
      expect(stub1).toHaveBeenCalledTimes(1);
      expect(stub2).toHaveBeenCalledTimes(0);

      await vi.advanceTimersByTimeAsync(1);
      await Promise.resolve();
      expect(stub1).toHaveBeenCalledTimes(1);
      expect(stub2).toHaveBeenCalledTimes(1);
    });
  });
});
