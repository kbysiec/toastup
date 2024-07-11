import { useColorMode } from "@docusaurus/theme-common";
import sharedStyles from "@site/src/css/shared.module.scss";
import {
  DisplayOrder,
  ReactToastConfig,
  ToastPosition,
  ToastTheme,
  ToastType,
  Toaster,
  displayOrder,
  position,
  theme,
  toast,
  type,
} from "@toastup/react";
import { useEffect, useState } from "react";
import { CodeBlock } from "../CodeBlock/CodeBlock";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import {
  InAnimation,
  InBodyAnimation,
  OutAnimation,
  inAnimation,
  inBodyAnimation,
  outAnimation,
} from "./animations";
import styles from "./Hero.module.scss";

type ToastPositionKey = keyof typeof position;
type ToastThemeKey = keyof typeof theme;

declare global {
  interface Window {
    add: (toastConfig: ReactToastConfig) => string;
    pause: (id?: string) => void;
    unpause: (id?: string) => void;
  }
}

export function Hero() {
  const { isDarkTheme } = useColorMode();

  const [toastId, setToastId] = useState(0);
  const [autoHide, setAutoHide] = useState(7000);
  const [availableType, setAvailableType] = useState<ToastType>(type.base);
  const [availablePosition, setAvailablePosition] = useState<ToastPosition>(
    position.bottomRight
  );
  const [order, setOrder] = useState<DisplayOrder>(displayOrder.normal);
  const [availableTheme, setAvailableTheme] = useState<ToastTheme>(
    isDarkTheme ? theme.dark : theme.colorful
  );
  const [inAnimationName, setInAnimationName] = useState<InAnimation>(
    inAnimation["slide vertically"].name
  );
  const [outAnimationName, setOutAnimationName] = useState<OutAnimation>(
    outAnimation["slide vertically"].name
  );
  const [inBodyAnimationName, setInBodyAnimationName] =
    useState<InBodyAnimation>(
      inBodyAnimation["slide horizontally with fade"].name
    );
  const [hideOnClick, setHideOnClick] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [showHideButton, setShowHideButton] = useState(true);
  const [animateBody, setAnimateBody] = useState(true);
  const [rtl, setRtl] = useState(false);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [dragOnMobile, setDragOnMobile] = useState(true);

  useEffect(() => {
    window.add = toast.add;
    window.pause = toast.pause;
    window.unpause = toast.unpause;
  }, []);

  useEffect(() => {
    setAvailableTheme(isDarkTheme ? theme.dark : theme.colorful);
  }, [isDarkTheme]);

  const handleRemoveAll = () => {
    toast.removeAll();
  };

  const handleClick = () => {
    const config: Partial<ReactToastConfig> = {
      position: availablePosition,
      type: availableType,
      title: availableType,
      order,
      inAnimation: inAnimation[inAnimationName].animation,
      outAnimation: outAnimation[outAnimationName].animation,
      inBodyAnimation: inBodyAnimation[inBodyAnimationName].animation,
      id: toastId.toString(),
      autoHide,
      theme: availableTheme,
      hideOnClick,
      showProgress,
      showIcon,
      showHideButton,
      animateBody,
      rtl,
      pauseOnHover,
      dragOnMobile,
    };

    toast.add(config);

    setToastId(toastId + 1);
  };

  const toastCode = `const config: Partial<ReactToastConfig> = {
  position: "${availablePosition}",
  type: "${availableType}",
  title: "${availableType}",
  order: "${order}",
  inAnimation: ${inAnimation[inAnimationName].techName},
  outAnimation: ${outAnimation[outAnimationName].techName},
  inBodyAnimation: ${inBodyAnimation[inBodyAnimationName].techName},
  autoHide: ${autoHide},
  theme: "${availableTheme}",
  hideOnClick: ${hideOnClick},
  showProgress: ${showProgress},
  showIcon: ${showIcon},
  showHideButton: ${showHideButton},
  animateBody: ${animateBody},
  rtl: ${rtl},
  pauseOnHover: ${pauseOnHover},
  dragOnMobile: ${dragOnMobile},
};
add(config);`;

  const toasterCode = `<Toaster
  position={"${availablePosition}"}
  type={"${availableType}"}
  title={"${availableType}"}
  order={"${order}"}
  inAnimation={${inAnimation[inAnimationName].techName}}
  outAnimation={${outAnimation[outAnimationName].techName}}
  inBodyAnimation={${inBodyAnimation[inBodyAnimationName].techName}}
  autoHide={${autoHide}}
  theme={"${availableTheme}"}
  ${hideOnClick ? "hideOnClick" : "hideOnClick={false}"}
  ${showProgress ? "showProgress" : "showProgress={false}"}
  ${showIcon ? "showIcon" : "showIcon={false}"}
  ${showHideButton ? "showHideButton" : "showHideButton={false}"}
  ${animateBody ? "animateBody" : "animateBody={false}"}
  ${rtl ? "rtl" : "rtl={false}"}
  ${pauseOnHover ? "pauseOnHover" : "pauseOnHover={false}"}
  ${dragOnMobile ? "dragOnMobile" : "dragOnMobile={false}"}
  visibleToasts={5}
/>`;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.basicSettings}>
          <div className={styles.row}>
            <div className={styles.element}>
              <label className={styles.label} htmlFor="autoHide">
                Autohide time
              </label>
              <input
                className={styles.input}
                name="autoHide"
                type="number"
                value={autoHide}
                onChange={e => setAutoHide(parseInt(e.target.value))}
              />
            </div>
            <div className={styles.element}>
              <label className={styles.label} htmlFor="toastType">
                Type
              </label>
              <select
                name="toastType"
                className={styles.select}
                value={availableType}
                onChange={e => setAvailableType(e.target.value as ToastType)}
              >
                {Object.keys(type).map(key => (
                  <option key={key} value={type[key as ToastType]}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.element}>
              <label className={styles.label} htmlFor="toastPosition">
                Position
              </label>
              <select
                name="toastPosition"
                className={styles.select}
                value={availablePosition}
                onChange={e =>
                  setAvailablePosition(e.target.value as ToastPosition)
                }
              >
                {Object.keys(position).map(key => (
                  <option key={key} value={position[key as ToastPositionKey]}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.element}>
              <label className={styles.label} htmlFor="displayOrder">
                Display order
              </label>
              <select
                name="displayOrder"
                className={styles.select}
                value={order}
                onChange={e => setOrder(e.target.value as DisplayOrder)}
              >
                {Object.keys(displayOrder).map(key => (
                  <option key={key} value={displayOrder[key as DisplayOrder]}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.element}>
              <label className={styles.label} htmlFor="theme">
                Theme
              </label>
              <select
                name="theme"
                className={styles.select}
                value={availableTheme}
                onChange={e => setAvailableTheme(e.target.value as ToastTheme)}
              >
                {Object.keys(theme).map(key => (
                  <option key={key} value={theme[key as ToastThemeKey]}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.element}>
              <label className={styles.label} htmlFor="inAnimation">
                In animation
              </label>
              <select
                name="inAnimation"
                className={styles.select}
                value={inAnimationName}
                onChange={e =>
                  setInAnimationName(e.target.value as InAnimation)
                }
              >
                {Object.keys(inAnimation).map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.element}>
              <label className={styles.label} htmlFor="outAnimation">
                Out animation
              </label>
              <select
                name="outAnimation"
                className={styles.select}
                value={outAnimationName}
                onChange={e =>
                  setOutAnimationName(e.target.value as OutAnimation)
                }
              >
                {Object.keys(outAnimation).map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.element}>
              <label className={styles.label} htmlFor="inBodyAnimation">
                In body animation
              </label>
              <select
                name="inBodyAnimation"
                className={styles.select}
                value={inBodyAnimationName}
                onChange={e =>
                  setInBodyAnimationName(e.target.value as InBodyAnimation)
                }
              >
                {Object.keys(inBodyAnimation).map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.additionalSettings}>
          <div className={styles.row}>
            <ToggleSwitch
              label="hide on click"
              value={hideOnClick}
              onValueChange={setHideOnClick}
            />
            <ToggleSwitch
              value={showProgress}
              onValueChange={setShowProgress}
              label="show progress"
            />
            <ToggleSwitch
              value={showIcon}
              onValueChange={setShowIcon}
              label="show icon"
            />
            <ToggleSwitch
              value={showHideButton}
              onValueChange={setShowHideButton}
              label="show hide button"
            />
          </div>
          <div className={styles.row}>
            <ToggleSwitch
              value={animateBody}
              onValueChange={setAnimateBody}
              label="animate body"
            />
            <ToggleSwitch value={rtl} onValueChange={setRtl} label="rtl" />
            <ToggleSwitch
              value={pauseOnHover}
              onValueChange={setPauseOnHover}
              label="pause on hover"
            />
            <ToggleSwitch
              value={dragOnMobile}
              onValueChange={setDragOnMobile}
              label="drag on mobile"
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={sharedStyles.buttonPrimary} onClick={handleClick}>
            Add toast
          </button>
          <button
            className={sharedStyles.buttonSecondary}
            onClick={handleRemoveAll}
          >
            Remove all
          </button>
        </div>
      </div>
      <Toaster visibleToasts={3} />
      <div className={styles.codeBlocks}>
        <div className={styles.codeBlock}>
          <label className={styles.label}>Toast adding</label>
          <CodeBlock language="ts" code={toastCode} />
        </div>
        <div className={styles.codeBlock}>
          <label className={styles.label}>Toaster</label>
          <CodeBlock language="tsx" code={toasterCode} />
        </div>
      </div>
    </>
  );
}
