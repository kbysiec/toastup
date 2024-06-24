import { describe, expect, it, vi } from "vitest";
import { events } from "../src/constants";
import { eventManager } from "../src/eventManager";

describe("eventManager", () => {
  const eventMgr = eventManager.get();
  it("should subscribe to the event", () => {
    const stub = vi.fn();
    eventMgr.on(events.add, stub);
    eventMgr.emit(events.add, "");

    expect(stub).toBeCalledTimes(1);
  });

  it("should emit the event", () => {
    const stub = vi.fn();
    eventMgr.on(events.add, stub);

    expect(stub).not.toBeCalled();
    eventMgr.emit(events.add, "");
    expect(stub).toBeCalledTimes(1);
  });

  it("should unsubscribe from an event", () => {
    const stub1 = vi.fn();
    const stub2 = vi.fn();

    eventMgr.on(events.add, stub1);
    eventMgr.on(events.add, stub2);

    eventMgr.emit(events.add, "");
    expect(stub1).toBeCalledTimes(1);
    expect(stub2).toBeCalledTimes(1);

    eventMgr.off(events.add, stub1);

    eventMgr.emit(events.add, "");
    expect(stub1).toBeCalledTimes(1);
    expect(stub2).toBeCalledTimes(2);
  });
});
