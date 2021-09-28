import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  bgColor: "lightgray",
  fontColor: "#2c2c2c",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#2c2c2c",
  fontColor: "lightgray",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}

    body {
        background-color: ${(props) => props.theme.bgColor};
    }
`;
