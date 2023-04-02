import { minify } from "../../utils/helpers";

const style = `
/* ==========================================================================
**   0. POPUP
** ========================================================================*/

#popup__wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  background: transparent;
  pointer-events: none;
}

#popup__wrapper > div {
  width: 100%;
  height: 200px;
  z-index: 2;
  position: absolute;
  transition: all 1s ease-out;
  top: 100%;
  background-color: grey;
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
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: Bisque;
  height: 100%; 
}

#popup__wrapper label div {
  text-align:center;
}

#popup__wrapper label:has(input:checked) {
  background: AntiqueWhite;
}

#popup__wrapper input {
  display:none;
}

/* ==========================================================================
**   1. TIMER
** ========================================================================*/

.timer {
  width: 100%;
  height: 10px;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer__value {
  background-color: var(--primary-color);
  height: 100%;
  width:100%;
  transition: all 0.3s ease-out;
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
