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
  z-index: 6;
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

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  background:white;
  width: 100%;
  height: 100%;
}

button {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
}

label {
  font-family: 'M plus 1p', sans-serif;
  color: white;
  display: flex;
  text-align: center;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: #101010;
  cursor:pointer;
}


label:hover {
  background: var(--shammas-primary-color);
}

label div {
  text-align:center;
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;
  order: 0;
  padding: 2rem;
}

label:has(input:checked) {
  opacity: 1;
}

input {
  display:none;
}

@media screen and (max-width: 800px) {

  #popup__wrapper .buttons {
    grid-template-columns: 1fr;
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
  // const minifyCss = minify(style);
  export default style;
