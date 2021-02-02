/*
 * @Author: AA
 * @Date: 2021-01-28 01:18:43
 * @LastEditors: AA
 * @LastEditTime: 2021-01-30 14:30:17
 * @FilePath: /src/config/index.js
 */

import Logo from "../assets/images/logo.png";
import LogoReverse from "../assets/images/logo-reverse.png";

export default {
  // Determine whether the environment is dev or pro
  process_env: "pro",
  baseURL: "http://localhost:3000",
  // Site name
  title: "Home Together",
  // Website LOGO
  logo: Logo,
  logoReverse: LogoReverse,
  // Change the theme when the scroll bar scrolls to this specified threshold
  topBarScollTop: 400,
  theme: {
    palette: {
      primary: {
        light: "#faa2d4",
        main: "#fc90cd",
        dark: "#f558b1",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#ff86cd",
        dark: "#ff0095",
        contrastText: "#fff",
      },
      default: {
        light: "#ff7961",
        main: "#ff86cd",
        dark: "#ff0095",
        contrastText: "#fff",
      },
    },
    shadows: [
      "0 0 8px rgba(0,0,0, 0.18)",
      "0 5px 5px 0 rgba(0,0,0, 0.2)",
      "0 5px 15px 0 rgba(0,0,0, 0.2)",
      "0 4px 5px 0 rgba(0,0,0, 0.2)",
      "0 6px 10px 0 rgba(0,0,0, 0.2)",
      "0 8px 10px 1px rgba(0,0,0, 0.2)",
      "0 16px 24px 2px rgba(0,0,0, 0.2)",
      "0 9px 46px 8px rgba(0,0,0, 0.2)",
      "0 9px 46px 8px rgba(0,0,0, 0.2)",
    ],
    shape: {
      borderRadius: 25,
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 25,
        },
      },
    },
  },
};
