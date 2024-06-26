import {
  DisplayOrder,
  ReactToastConfig,
  ToastInAnimation,
  ToastInBodyAnimation,
  ToastOutAnimation,
  ToastPosition,
  ToastTheme,
  ToastType,
  Toaster,
  add,
  bounceHorizontallyIn,
  bounceHorizontallyOut,
  displayOrder,
  fadeIn,
  fadeOut,
  position,
  removeAll,
  singleBounceHorizontallyIn,
  singleBounceHorizontallyOut,
  singleBounceVerticallyIn,
  singleBounceVerticallyOut,
  slideHorizontalWithFadeInBody,
  slideHorizontallyIn,
  slideHorizontallyOut,
  slideVerticallyIn,
  slideVerticallyOut,
  slideVerticallyWithFadeInBody,
  theme,
  type,
  zoomIn,
  zoomInBody,
  zoomOut,
  zoomWithBounceIn,
  zoomWithBounceOut,
} from "@toastup/react";
import { useState } from "react";
import { Button, SelectPicker } from "rsuite";

type ToastPositionKey = keyof typeof position;
type ToastThemeKey = keyof typeof theme;

export function Home() {
  const [counter, setCounter] = useState(0);
  const [autoHide, setAutoHide] = useState(50000);
  const [availableType, setAvailableType] = useState<ToastType>(type.success);
  const [availablePosition, setAvailablePosition] = useState<ToastPosition>(
    position.bottomRight
  );
  const [order, setOrder] = useState<DisplayOrder>(displayOrder.reversed);
  const [availableTheme, setAvailableTheme] = useState<ToastTheme>(
    theme.colorful
  );
  const [inAnimation, setInAnimation] =
    useState<ToastInAnimation>(slideVerticallyIn);
  const [outAnimation, setOutAnimation] =
    useState<ToastOutAnimation>(slideVerticallyOut);
  const [inBodyAnimation, setInBodyAnimation] = useState<ToastInBodyAnimation>(
    slideHorizontalWithFadeInBody
  );

  const handleCloseAll = () => {
    removeAll();
  };

  const handleClick = () => {
    const overriddenConfig: Partial<ReactToastConfig> = {
      position: availablePosition,
      type: availableType,
      title: availableType,
      order,
      inAnimation,
      outAnimation,
      inBodyAnimation,
      hideOnClick: true,
      id: counter.toString(),
      autoHide,
      animateBody: true,
      theme: availableTheme,
      dragOnMobile: true,
    };
    const id = add(overriddenConfig);

    setCounter(counter + 1);
    console.log("added toast id", id);
  };

  const inAnimations = {
    fadeIn,
    zoomIn,
    zoomWithBounceIn,
    slideVerticallyIn,
    slideHorizontallyIn,
    bounceHorizontallyIn,
    singleBounceHorizontallyIn,
    singleBounceVerticallyIn,
  };

  const outAnimations = {
    fadeOut,
    zoomOut,
    zoomWithBounceOut,
    slideVerticallyOut,
    slideHorizontallyOut,
    bounceHorizontallyOut,
    singleBounceHorizontallyOut,
    singleBounceVerticallyOut,
  };

  const inBodyAnimations = {
    zoomInBody,
    slideHorizontalWithFadeInBody,
    slideVerticallyWithFadeInBody,
  };

  return (
    <>
      <div style={{ marginBottom: "5em" }}>
        <input
          type="number"
          value={autoHide}
          onChange={e => setAutoHide(parseInt(e.target.value))}
        />
        <SelectPicker
          data={Object.keys(type).map(key => ({
            label: key,
            value: type[key as ToastType],
          }))}
          value={availableType}
          onChange={value => setAvailableType(value as ToastType)}
        />
        <SelectPicker
          data={Object.keys(position).map(key => ({
            label: key,
            value: position[key as ToastPositionKey],
          }))}
          value={availablePosition}
          onChange={value => setAvailablePosition(value as ToastPosition)}
        />
        <SelectPicker
          data={Object.keys(displayOrder).map(key => ({
            label: key,
            value: displayOrder[key as ToastPositionKey],
          }))}
          value={order}
          onChange={value => setOrder(value as DisplayOrder)}
        />
        <SelectPicker
          data={Object.keys(theme).map(key => ({
            label: key,
            value: theme[key as ToastThemeKey],
          }))}
          value={availableTheme}
          onChange={value => setAvailableTheme(value as ToastTheme)}
        />
        <SelectPicker
          data={Object.keys(inAnimations).map(key => ({
            label: key,
            value: inAnimations[key],
          }))}
          value={inAnimation}
          onChange={value => setInAnimation(value as ToastInAnimation)}
        />
        <SelectPicker
          data={Object.keys(outAnimations).map(key => ({
            label: key,
            value: outAnimations[key],
          }))}
          value={outAnimation}
          onChange={value => setOutAnimation(value as ToastOutAnimation)}
        />
        <SelectPicker
          data={Object.keys(inBodyAnimations).map(key => ({
            label: key,
            value: inBodyAnimations[key],
          }))}
          value={inBodyAnimation}
          onChange={value => setInBodyAnimation(value as ToastInBodyAnimation)}
        />

        <br />
        <Button color="yellow" appearance="primary" onClick={handleClick}>
          Add toast
        </Button>
        <Button color="red" appearance="primary" onClick={handleCloseAll}>
          Close all
        </Button>
      </div>
      <Toaster visibleToasts={5} />
    </>
  );
}
