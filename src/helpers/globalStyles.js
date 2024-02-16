import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  font-family: 'Roboto', sans-serif;
  //font-size: 62.5%;
  height: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //font-size: 1.6rem;
  height: 100%;
  margin: 0;
  min-height: 100%;
  background-color: #F6F6F6;

}

html,
body {
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
}

*,
*:before,
*:after {
  
}`;
