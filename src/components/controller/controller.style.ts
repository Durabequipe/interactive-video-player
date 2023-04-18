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
  opacity: 1;
  transition: opacity 0.15s ease-in-out;
  display: flex;
  align-items: center;
  justify-content:center;
}



.controller__wrapper.visible {
  opacity: 1;
}

/********************************************************************************
 *                  PROGRESS BAR
 ********************************************************************************/

#progressBar {
  width: 100%;
  height: 3px;
  border: 1px;
  margin-right: 30px;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #ddd;
  outline: none;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
}

input[type=range]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
}

input[type=range]::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #555 0%, #555 calc(50% - 10px), #4CAF50 calc(50% - 10px), #4CAF50 100%);
}
 
input[type=range]::-moz-range-track {
  background: linear-gradient(to right, #555 0%, #555 calc(50% - 10px), #4CAF50 calc(50% - 10px), #4CAF50 100%);
}



/********************************************************************************
 *                  PICTOS
 ********************************************************************************/

button {
  padding-left: 15px;
  padding-right: 15px;
  background-color: #00000000;
  border: none;
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
