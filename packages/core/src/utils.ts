import { MeasureType } from "./types";

// source: https://github.com/portexe/PortalsAndToast/blob/f0f7479a4beef5471a19c2d72edb6f3f72aca872/src/core/helpers.js
export const uuid = () => {
  let dt = new Date().getTime();

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export function getOuter(element: HTMLElement, type: MeasureType): number {
  const measures = {
    height: {
      offset: "offsetHeight",
      margins: ["top", "bottom"],
    },
    width: {
      offset: "offsetWidth",
      margins: ["left", "right"],
    },
  } as const;

  const measure = measures[type];
  const offsetMeasure = element[measure.offset];
  const style = window.getComputedStyle(element);

  return measure.margins
    .map(side => {
      const value = style[`margin-${side}` as keyof typeof style];
      return typeof value === "string" && value !== "" ? parseInt(value) : 0;
    })
    .reduce((total, side) => total + side, offsetMeasure);
}

export function groupBy<T, K extends string | number | symbol>(
  list: T[],
  getKey: (item: T) => K
) {
  return list.reduce(
    (previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    },
    {} as Record<K, T[]>
  );
}

export function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export function getTransformOtherThan(
  element: HTMLElement,
  transformToOmit: string
) {
  const regex = new RegExp(`${transformToOmit}([X|Y|Z]?)\\(([^)]+)\\)`);
  const currentTransform = element.style.transform;
  return currentTransform.replace(regex, "").trim();
}

export function getCoalesced<TDefault, TOverridden>(
  config: TDefault,
  ...overriddenConfigs: TOverridden[]
): TDefault {
  return Object.assign({}, config, ...overriddenConfigs) as TDefault;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (variable: unknown): variable is Function =>
  typeof variable === "function";

export const isHTMLElement = (element: unknown): boolean =>
  element instanceof HTMLElement;
