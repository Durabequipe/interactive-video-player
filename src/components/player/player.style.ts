import { minify } from "../../utils/helpers";

const style = `
.video-player__wrapper {
  position: relative;
  height: 100%;
  background: #242424;
  display: flex;
  align-items: center;
  justify-content:center;
}

.video__wrapper {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
`;
const minifyCss = minify(style);
export default minifyCss;
