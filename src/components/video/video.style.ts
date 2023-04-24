const style = `
div {
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
}

video {
  position: relative;
  top: 0;
  left: 0;
  max-height: 100vh;
}

.video-1 {
  width:0;
  z-index: -1;
}

.video-2 {
  z-index: -1;
  width:0;
}

.is-primary-video {
  width:100%;
  z-index: 2 !important;
}
`;
export default style;
