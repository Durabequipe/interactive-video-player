import style from './controller.style';
import { Icons } from '../../models/player';

const template = document.createElement("template");
template.innerHTML = `
  <style>${style}</style>
  <div class="controller__wrapper">
    
    <button id="toggle" class="icon play" aria-label="PLAY/PAUSE">
      <img src="${Icons.PLAY}" alt="play">
    </button>
    <button id="mute" class="icon sound" aria-label="MUTE/UNMUTE">
      <img src="${Icons.VOLUME_UP}" alt="mute">
    </button>
    <input id="progressBar" type="range" name="progressBar" min="0" max="100" value="0">
  </div>
`;
export default template;
