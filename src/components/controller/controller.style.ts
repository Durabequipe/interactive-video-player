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
  justify-content: center;
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
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  outline: none;
  background-color: #ffffff10;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
}

input[type=range]::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
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


@media (orientation: portrait) {

  .controller__wrapper {
    height: 100%;
    position: absolute;
    background-color: #00000010;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    display: flex;
    visibility: collapse;
  }

  .icon img {
    width: 70px;
    visibility: visible;
  }

  .play {
    position: absolute;
  }

  .sound {
    margin: 0px;
    position: absolute;
    padding: 0px;
    height: 5px;
    top: 1vw;
    left: 1vw;
  }

  .sound img {
    width: 30px;
  }

  #progressBar {
    margin: 0px;
    position: absolute;
    padding: 0px;
    height: 10px;
    bottom: 1vw;
    visibility: visible;
  }

  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    outline: none;
    background-color: #ffffff10;
  }
  
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffffff;
    cursor: pointer;
  }
  
  input[type=range]::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
    cursor: pointer;
  }
}
`
  const minifyCss = minify(style);
  export default minifyCss;
