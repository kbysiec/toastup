import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { events } from "../../src/constants";
import { handleAddedToast } from "../../src/handlers/addHandler";
import * as toastQueue from "../../src/toastQueue";
import { ToastEntity } from "../../src/types";
import { toastBase } from "../mocks";

describe("addHandler", () => {
  const addStub = vi.fn();

  let queue: Map<string, ToastEntity>;
  let toast = { ...toastBase };

  beforeEach(() => {
    toast = { ...toastBase };
    queue = new Map<string, ToastEntity>();
    vi.spyOn(toastQueue.toastQueue, "get").mockReturnValue(queue);
    vi.spyOn(toastQueue, "addToQueue").mockImplementation(addStub);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("handleAddedToast", () => {
    it("should add function be invoked with toast", () => {
      const event = new CustomEvent<ToastEntity>(events.added, {
        detail: toast,
      });

      handleAddedToast(event);
      expect(addStub).toHaveBeenCalledWith(toast);
    });
  });
});
