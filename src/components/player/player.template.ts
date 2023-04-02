import style from './player.style';
import  '../controller/controller';
import  '../popup/popup';
import  '../video/video';
import { COMPONENT_NAME as N } from '../../utils/helpers';

const template = document.createElement("template");
template.innerHTML = `
  <style>${style}</style>
  <div class="video-player__wrapper">

    <div class="video__wrapper">
      <${N.VIDEO}></${N.VIDEO}>
      <${N.POPUP}></${N.POPUP}>
    </div>

    <${N.CONTROLLER}></${N.CONTROLLER}>
  </div>
`;
export default template;
