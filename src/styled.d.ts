import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    accent: string;
    bgColor: string;
    borderColor: string;
    fontColor: string;
  }
}
