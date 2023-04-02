import { minify } from "../../utils/helpers";

const style = `
.video-player__wrapper {
  display: flex;
  flex-direction: column;
}

.video__wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

.video__wrapper > div {
  display: flex;
  flex-direction: column;
  position: relative;
}
`;
const minifyCss = minify(style);
export default minifyCss;
