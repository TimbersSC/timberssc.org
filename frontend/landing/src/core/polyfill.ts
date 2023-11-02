export const polyfill = () => {
  window.Buffer = window.Buffer || require("buffer").Buffer;
}
