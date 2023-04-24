import { minify } from "./helpers";

const style = `
shammas-player {
  --shammas-primary-color: #FF3A21;
}
`;
const minifyCss = minify(style);
export default minifyCss;
