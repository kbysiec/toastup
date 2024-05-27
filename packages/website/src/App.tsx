import {
  DisplayOrder,
  ReactConfig,
  ToastPosition,
  ToastProps,
  ToastTheme,
  ToastType,
  Toaster,
  add,
  cssClassNames,
  displayOrder,
  eventManager,
  events,
  position,
  singleBounceHorizontallyOut,
  theme,
  type,
} from "@toastup/react";
import "animate.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "@toastup/core/dist/style.css";
import "react-toastify/dist/ReactToastify.css";

// import "@toastup/core/dist/style.css";

type ToastPositionKey = keyof typeof position;
type ToastThemeKey = keyof typeof theme;

// const CustomIcon: React.FC = ({ style }) => (
//   <img style={style} src="https://www.w3schools.com/howto/img_avatar2.png" />
// );
// // const CustomIcon: React.FC = () => <span className="fa fa-google fa-2x"></span>;
// const CustomHideButton: React.FC = ({ onClick, style }) => (
//   <span className="fa fa-smile-o fa-lg" onClick={onClick} style={style}></span>
// );
// const CustomBody: React.FC = ({ children, style, role, className }) => (
//   <div
//     style={style}
//     onClick={() => console.log(role)}
//     data-component="body"
//     className={className}
//   >
//     <span>DUPA</span>
//     {/* {children} */}
//   </div>
// );
// const CustomContent: React.FC = ({ children, style }) => (
//   <span className="xxx">
//     {/* <img
//       style={{ maxWidth: "100%" }}
//       src="https://assets.toptal.io/images?url=https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1154082/regular_1708x683_cover-react-context-api-4929b3703a1a7082d99b53eb1bbfc31f.png"
//     /> */}
//     {children}
//   </span>
// );

// const CustomContent2: React.FC = () => (
//   <img
//     style={{ maxWidth: "100%" }}
//     src="https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
//   />
// );

// const XXX = () => (
//   <div data-component="body" style={{ opacity: 0 }}>
//     uuuuuu
//   </div>
// );

const CustomToast = (props: ToastProps) => {
  const { id, hide, type, className, rtl, theme, ref, children } = props;
  console.log(props);
  return (
    <div
      ref={ref}
      aria-label="toast"
      className={`${cssClassNames.toastDefault} ${
        cssClassNames.toastType[type]
      } ${theme}${rtl ? ` ${cssClassNames.toastRtl}` : ""}${
        className ? ` ${className}` : ""
      }`}
      onClick={e => {
        e.preventDefault();
        eventManager.emit(events.click, id);
        hide(true);
      }}
    >
      <div className={cssClassNames.container} data-component="container">
        <div
          className={cssClassNames.content}
          style={{
            background: "rgb(255, 203, 0)",
            padding: "1em",
            borderRadius: "0.5em",
          }}
        >
          <div data-component="body" style={{ opacity: 0 }}>
            xxxx
          </div>
          <button
            type="button"
            aria-label="close"
            className="toastup__toast-hide-button"
          >
            A
          </button>
        </div>
      </div>
      {/* {children} */}
    </div>
  );
};

// const CustomXXX: React.FC<ToastProps> = ({ ref }) => (
//   <div
//     ref={ref}
//     style={{ background: "lightblue" }}
//     className={`toastup__toast--default`}
//   >
//     <div data-component="container" className="toastup__toast-container">
//       <div data-component="body">xxxxa</div>
//     </div>
//   </div>
// );

export function App() {
  const [counter, setCounter] = useState(0);
  const [autoHide, setAutoHide] = useState(50000);
  const [availableType, setAvailableType] = useState<ToastType>(type.success);
  const [availablePosition, setAvailablePosition] = useState<ToastPosition>(
    position.bottomRight
  );
  const [order, setOrder] = useState<DisplayOrder>(displayOrder.normal);
  const [availableTheme, setAvailableTheme] = useState<ToastTheme>(
    theme.colorful
  );

  const notify = () => toast("Wow so easy !");

  // const singleBounceVerticallyIn: ToastInAnimation = {
  //   type: animationType.in,
  //   animationName: "single-bounce-vertically-in",
  //   animationTime: 500,
  // };

  // const bounceHorizontallyIn: ToastInAnimation = {
  //   type: animationType.in,
  //   animationName: "bounce-horizontally-in",
  //   animationTime: 500,
  // };

  // const singleBounceVerticallyOut: ToastOutAnimation = {
  //   type: animationType.out,
  //   animationName: "single-bounce-vertically-out",
  //   animationTime: 500,
  // };

  const handleClick = () => {
    const overriddenConfig: Partial<ReactConfig> = {
      message:
        Math.random() > 0.5
          ? `x - ${counter}`
          : `x - ${counter}


        multiline`,
      position: availablePosition,
      type: availableType,
      title: availableType,
      order,
      // showIcon: false,
      // showHideButton: false,
      hideOnClick: true,
      // delayBeforeShow: 3000,
      id: counter.toString(),
      // id: Math.random() > 0.5 ? counter.toString() : undefined,
      // autoHide: false,
      // autoHide: Math.random() > 0.5 ? 54000 : 53000,
      autoHide,
      // inAnimation: flipXIn,
      // inAnimation:
      //   Math.random() > 0.5 ? singleBounceVerticallyIn : bounceHorizontallyIn,
      outAnimation: singleBounceHorizontallyOut,
      animateBody: true,
      // inBodyAnimation: slideHorizontalWithFadeInBody,
      theme: availableTheme,
      // rtl: Math.random() > 0.5,
      // removeOnDraggingPercent: 20,
      // icon: <CustomIcon />,
      // hideButton: <CustomHideButton />,
      // hideButtonStyle: { position: "absolute", top: "10px", right: "10px" },
      // content: <CustomContent />,
      // content: Math.random() > 0.5 && <CustomContent />,
      // body: document.createElement("div"),
      // body: () => <div>xxxx</div>,
      // body: XXX,
      // toast: CustomToast,
      // body: () => (
      //   <div data-component="body" style={{ opacity: 0 }}>
      //     lalala
      //   </div>
      // ),
      // body: Math.random() > 0.5 && <CustomBody />,
      // contentStyle: {
      //   backgroundImage:
      //     "url(https://assets.toptal.io/images?url=https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1154082/regular_1708x683_cover-react-context-api-4929b3703a1a7082d99b53eb1bbfc31f.png)",
      //   backgroundPosition: "center",
      //   color: "#fff",
      //   backgroundSize: "cover",
      //   display: "flex",
      //   alignItems: "center",
      //   borderRadius: "0.4rem 0.4rem 0.3rem 0.3rem",
      //   height: "100%",
      //   lineHeight: "100%",
      //   margin: "2px",
      //   maxHeight: "20rem",
      //   minHeight: "2rem",
      //   overflow: "hidden",
      //   padding: "1rem",
      //   position: "relative",
      //   whiteSpace: "pre-wrap",
      //   width: "100%",
      // },
      // bodyClassName: "invisible",
      // iconStyle: {
      //   stroke: "#fff",
      //   fill: "#fff",
      //   maxWidth: "4em",
      //   margin: "1em",
      // },
      // content: Math.random() > 0.5 ? <CustomContent /> : <CustomContent2 />,
      // hideOnClick: false,
      // hideButtonClassName: "test-1 test-2",
      // iconClassName: "no-padding",
      // contentClassName: "no-padding",
      // containerClassName: "thicker-toast",
      // bodyClassName: "purple-toast",
      // progressBarClassName: "aqua-progress-bar",
      // onShowing: (props: ToastPublicProps) =>
      //   console.log("showing toast with id", props),
      // onHiding: (props: ToastPublicProps) =>
      //   console.log("hiding toast with id", props),
      // onShow: (props: ToastPublicProps) =>
      //   console.log("show toast with id", props),
      // onHide: (props: ToastPublicProps) =>
      //   console.log("hide toast with id", props),
      // onClick: (props: ToastPublicProps) =>
      //   console.log("click toast with id", props),
      // pauseOnHover: false,
      dragOnMobile: true,
      // toast: CustomToast,
    };
    const id = add(overriddenConfig);

    setCounter(counter + 1);
    console.log("added toast id", id);
  };

  return (
    <>
      {/* <img
        src={logo}
        alt="logo"
        style={{ position: "absolute", width: "5em", left: "3em", top: "3em" }}
      /> */}
      <div
        style={{
          width: "60vw",
          height: "50vh",
          margin: "25vh auto",
          backgroundColor: "#fff6df",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "5em" }}>
          <h1>Welcome</h1>
          <input
            type="number"
            value={autoHide}
            onChange={e => setAutoHide(parseInt(e.target.value))}
          />
          <select
            value={availableType}
            onChange={e => setAvailableType(e.target.value as ToastType)}
          >
            {Object.keys(type).map(key => (
              <option key={key} value={type[key as ToastType]}>
                {key}
              </option>
            ))}
          </select>
          <select
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
          <select
            value={order}
            onChange={e => setOrder(e.target.value as DisplayOrder)}
          >
            {Object.keys(displayOrder).map(key => (
              <option key={key} value={displayOrder[key as DisplayOrder]}>
                {key}
              </option>
            ))}
          </select>
          <select
            value={availableTheme}
            onChange={e => setAvailableTheme(e.target.value as ToastTheme)}
          >
            {Object.keys(theme).map(key => (
              <option key={key} value={theme[key as ToastThemeKey]}>
                {key}
              </option>
            ))}
          </select>
          <br />
          <button
            style={{ marginTop: "1em", width: "8em", height: "3em" }}
            onClick={handleClick}
          >
            Add toast
          </button>
          <button onClick={notify}>Notify !</button>
        </div>
      </div>
      <Toaster />
      <ToastContainer />
    </>
  );
}
