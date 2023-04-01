const style = `
/* ==========================================================================
**   0. PLAYER
** ========================================================================*/

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

/* ==========================================================================
**   1. POPUP
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

/* ==========================================================================
**   2. VIDEO
** ========================================================================*/

video {
  position: relative;
  top: 0;
  left: 0;
}

.controller {
  width: 100%;
  height: 50px;
  background-color: red;
  text-align: center;
}

#video-1 {
  z-index: 1;
}

#video-2 {
  z-index: 1;
  position: absolute;
}

/* ==========================================================================
**   3. TIMER
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
  background-color: red;
  height: 100%;
  width:100%;
  transition: all 0.3s ease-out;
}

/* ==========================================================================
**  4. UILITY 
** ========================================================================*/

.is-primary-video {
  z-index: 2 !important;
}

.FULL {
  top: 0 !important;
}

.BOTTOM {
  top: 0 !important;
}

`
  export default style;
