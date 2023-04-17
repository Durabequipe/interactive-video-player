import style from './controller.style';

const template = document.createElement("template");
template.innerHTML = `
  <style>${style}</style>
  <div class="controller__wrapper">
    
    <button id="toggle" class="icon play" aria-label="PLAY/PAUSE">
      <img src="https://api.iconify.design/ic/round-play-arrow.svg?color=white&width=30" alt="ee">
    </button>
    <button id="mute" class="icon sound" aria-label="MUTE/UNMUTE">
      <img src="https://api.iconify.design/material-symbols/volume-up-rounded.svg?color=white&width=30" alt="eee">
    </button>
    <input id="progressBar" type="range" name="progressBar" min="0" max="100" value="0">
  </div>
`;
export default template;
