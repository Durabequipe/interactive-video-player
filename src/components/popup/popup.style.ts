import { minify } from "../../utils/helpers";

const style = `
/* ==========================================================================
**   0. POPUP
** ========================================================================*/

#popup__wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  background: transparent;
  pointer-events: none;
  display: flex;
}

#popup__wrapper > div {
  width: 100%;
  height: 100%;;
  z-index: 2;
  position: absolute;
  transition: all 1s ease-out;
  top: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}

#popup__wrapper p {
  text-align: center;
}

#popup__wrapper .buttons {
  display: flex;
  width: 100%;
  height: 100%;
}

#popup__wrapper button {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

#popup__wrapper label {
  font-family: 'Mplus 1p', sans-serif;
  color: white;
  border-right: 5px solid white;
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100%; 
  background: #101010;
}

#popup__wrapper label:hover {
  background: red;
}

#popup__wrapper label div {
  text-align:center;
}

#popup__wrapper label:has(input:checked) {
  background: red;
  opacity: 1;
}

#popup__wrapper input {
  display:none;
}

@media (orientation: portrait) {

  #popup__wrapper label {
    
    border-bottom: 5px solid white;
  }
  
  .popup__div .buttons {
    flex-direction: column;
  }
}

/* ==========================================================================
**  2. UILITY 
** ========================================================================*/

.FULL {
  top: 0 !important;
}

.BOTTOM {
  top: 0 !important;
}
`
  const minifyCss = minify(style);
  export default minifyCss;
