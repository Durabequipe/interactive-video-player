import { minify } from "../../utils/helpers";

const style = `
.controller__wrapper {
  width: 100%;
  height: 50px;
  background-color: red;
}

#toggle {
  
}
`
  const minifyCss = minify(style);
  export default minifyCss;
