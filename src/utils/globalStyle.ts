import { minify } from "./helpers";

const style = `
shammas-player {
  --primary-color: orange;
}
`;
const minifyCss = minify(style);
export default minifyCss;
