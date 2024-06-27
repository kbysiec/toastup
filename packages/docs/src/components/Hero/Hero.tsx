import { useColorMode } from "@docusaurus/theme-common";
import {
  DisplayOrder,
  ReactToastConfig,
  ToastPosition,
  ToastTheme,
  ToastType,
  Toaster,
  add,
  displayOrder,
  position,
  removeAll,
  theme,
  type,
} from "@toastup/react";
import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import {
  InAnimation,
  InBodyAnimation,
  OutAnimation,
  inAnimation,
  inBodyAnimation,
  outAnimation,
} from "./animations";

type ToastPositionKey = keyof typeof position;
type ToastThemeKey = keyof typeof theme;

export function Hero() {
  const { isDarkTheme } = useColorMode();

  const [toastId, setToastId] = useState(0);
  const [autoHide, setAutoHide] = useState(50000);
  const [availableType, setAvailableType] = useState<ToastType>(type.success);
  const [availablePosition, setAvailablePosition] = useState<ToastPosition>(
    position.bottomRight
  );
  const [order, setOrder] = useState<DisplayOrder>(displayOrder.reversed);
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

  useEffect(() => {
    setAvailableTheme(isDarkTheme ? theme.dark : theme.colorful);
  }, [isDarkTheme]);

  const handleCloseAll = () => {
    removeAll();
  };

  const handleClick = () => {
    const overriddenConfig: Partial<ReactToastConfig> = {
      position: availablePosition,
      type: availableType,
      title: availableType,
      order,
      inAnimation: inAnimation[inAnimationName].animation,
      outAnimation: outAnimation[outAnimationName].animation,
      inBodyAnimation: inBodyAnimation[inBodyAnimationName].animation,
      hideOnClick: true,
      id: toastId.toString(),
      autoHide,
      animateBody: true,
      theme: availableTheme,
      dragOnMobile: true,
    };
    add(overriddenConfig);

    setToastId(toastId + 1);
  };

  const toastCode = `<div className={styles.codeBlocks}>
  <div className={styles.codeBlock}>
    <label className={styles.label}>Toast</label>
    <CodeBlock code="console.log('yesssss')" />
  </div>
  <div className={styles.codeBlock}>
    <label className={styles.label}>Toaster</label>
    <CodeBlock code="console.log('Toaster')" />
  </div>
</div>`;

  return (
    <>
      <div className={styles.container}>
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
              onChange={e => setInAnimationName(e.target.value as InAnimation)}
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

        <br />
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleClick}>
            Add toast
          </button>
          <button
            className={`${styles.button} ${styles.closeAllButton}`}
            onClick={handleCloseAll}
          >
            Close all
          </button>
        </div>
      </div>
      <Toaster visibleToasts={5} />
    </>
  );
}

/*
<div className={styles.codeBlocks}>
        <div className={styles.codeBlock}>
          <label className={styles.label}>Toast</label>
          <CodeBlock code={toastCode} />
        </div>
        <div className={styles.codeBlock}>
          <label className={styles.label}>Toaster</label>
          <CodeBlock code="console.log('Toaster')" />
        </div>
      </div>
       */
