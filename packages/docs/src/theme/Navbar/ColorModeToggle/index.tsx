import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import ColorModeToggle from "@theme/ColorModeToggle";
import type { Props } from "@theme/Navbar/ColorModeToggle";
import { useEffect } from "react";
import styles from "./styles.module.css";

export default function NavbarColorModeToggle({
  className,
}: Props): JSX.Element | null {
  const navbarStyle = useThemeConfig().navbar.style;
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();

  if (disabled) {
    return null;
  }

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector("html")
        .classList.toggle("rs-theme-dark", colorMode === "dark");
    }, 50);
  }, []);

  const onChange = (colorMode: "light" | "dark") => {
    setColorMode(colorMode);
    document
      .querySelector("html")
      .classList.toggle("rs-theme-dark", colorMode === "dark");
  };

  return (
    <ColorModeToggle
      className={className}
      buttonClassName={
        navbarStyle === "dark" ? styles.darkNavbarColorModeToggle : undefined
      }
      value={colorMode}
      onChange={onChange}
    />
  );
}
