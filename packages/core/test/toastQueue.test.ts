import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { addToQueue, get, toastQueue, update } from "../src/toastQueue";
import { ToastEntity } from "../src/types";
import { toastBase } from "./mocks";

describe("toastQueue", () => {
  let queue: Map<string, ToastEntity>;

  beforeEach(() => {
    queue = new Map<string, ToastEntity>();
    vi.spyOn(toastQueue, "get").mockReturnValue(queue);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("get", () => {
    it("should return toastMap", () => {
      const toastMap = get();
      expect(toastMap).toEqual(queue);
    });
  });

  describe("addToQueue", () => {
    it("should add toast to toastMap if doesn't exist", () => {
      const toast = { ...toastBase };

      addToQueue(toast);
      expect(queue.has(toast.id)).toBeTruthy();
    });

    it("should throw error if toast with given id already exists", () => {
      const existingToast = {
        ...toastBase,
        uuid: "1",
        id: "1",
      };
      const toast = { ...toastBase, uuid: "2", id: "1" };
      queue.set(existingToast.id, existingToast);

      expect(() => addToQueue(toast)).toThrowError();
    });
  });

  describe("update", () => {
    it("should update toast in toastMap", () => {
      const existingToast = {
        ...toastBase,
        uuid: "1",
        id: "1",
      };
      const toast = { ...toastBase, uuid: "2", id: "1" };
      queue.set(existingToast.id, existingToast);

      update(toast);
      expect(queue.get(existingToast.id)?.uuid).toEqual(toast.uuid);
    });
  });
});
