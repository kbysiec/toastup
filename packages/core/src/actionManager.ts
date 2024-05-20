import { Action } from "@/types";

let isBusy = false;
const actionQueue: Action[] = [];

export async function register(action: Action) {
  actionQueue.push(action);
  await processIfIsNotBusy();
}

async function processIfIsNotBusy(): Promise<void> {
  !isBusy && (await process());
}

async function process() {
  setBusy(true);
  await processEach();
  setBusy(false);
}

function setBusy(value: boolean): void {
  isBusy = value;
}

async function processEach() {
  while (actionQueue.length) {
    const action = getNextFromQueue();
    action && (await action.fn());
  }
}

function getNextFromQueue(): Action | undefined {
  return actionQueue.shift();
}
