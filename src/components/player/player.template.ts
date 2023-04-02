import style from './player.style';
import  '../controller/controller';
import  '../popup/popup';

const template = document.createElement("template");
template.innerHTML = `
  <style>${style}</style>
  <div class="video-player__wrapper">

    <div class="video__wrapper">

      <div>
        <video width="100%" controls id="video-1" class="is-primary-video">
          <source type="video/mp4">
          Your browser does not support the video tag.
        </video>

        <video width="100%" controls id="video-2">
          <source type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <shammas-popup></shammas-popup>

    </div>

    <shammas-controller></shammas-controller>
  </div>
`;
export default template;
