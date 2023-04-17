import { minify } from "../../utils/helpers";

const style = `

video::-webkit-media-controls {
  display:none !important;
}

.controller__wrapper {
  height: 50px;
  background-color: #716A6A50;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  display: flex;
  align-items: center;
  // justify-content:center;
}

.controller__wrapper.visible {
  opacity: 1;
}

#progressBar {
  width: 70%;
  height: 3px;
  border: 1px;
}

/** 
 * PICTOS
*/

button {
  padding-left: 15px;
  padding-right: 15px;
  background-color: #00000000;
  border: none;
}

button img{

}

svg{
  fill: white;
  height: 2.5vh;
  color: white;
}

.icon {
}
`
  const minifyCss = minify(style);
  export default minifyCss;
