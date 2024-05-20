import { describe, expect, it, vi } from "vitest";
import { events } from "../src/constants";
import { eventManager } from "../src/eventManager";

describe("eventManager", () => {
  it("should subscribe to the event", () => {
    const stub = vi.fn();
    eventManager.on(events.add, stub);
    eventManager.emit(events.add, "");

    expect(stub).toBeCalledTimes(1);
  });

  it("should emit the event", () => {
    const stub = vi.fn();
    eventManager.on(events.add, stub);

    expect(stub).not.toBeCalled();
    eventManager.emit(events.add, "");
    expect(stub).toBeCalledTimes(1);
  });

  it("should unsubscribe from an event", () => {
    const stub1 = vi.fn();
    const stub2 = vi.fn();

    eventManager.on(events.add, stub1);
    eventManager.on(events.add, stub2);

    eventManager.emit(events.add, "");
    expect(stub1).toBeCalledTimes(1);
    expect(stub2).toBeCalledTimes(1);

    eventManager.off(events.add, stub1);

    eventManager.emit(events.add, "");
    expect(stub1).toBeCalledTimes(1);
    expect(stub2).toBeCalledTimes(2);
  });
});
