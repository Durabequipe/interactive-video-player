import { minify } from "../../utils/helpers";

const style = `
.controller__wrapper {
  width: 100%;
  height: 50px;
  background-color: red;
}

#toggle {
  
}

.progressBar_wrapper {
  padding 10%;
  display: flex;
  justify-content: center;
}

#progressBar {
  width: 95%;
}

#avanceRapide {
  color: red;
}
`
  const minifyCss = minify(style);
  export default minifyCss;
