import { minify } from "../../utils/helpers";

const style = `
div {
  display: flex;
  flex-direction: column;
  position: relative;
}

video {
  position: relative;
  top: 0;
  left: 0;
}

#video-1 {
  z-index: 1;
}

#video-2 {
  z-index: 1;
  position: absolute;
}

.is-primary-video {
  z-index: 2 !important;
}
`;
const minifyCss = minify(style);
export default minifyCss;
