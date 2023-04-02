import style from './player.style';
import  '../controller/controller';

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

      <div id="popup__wrapper">
        <template id="popup__template">
          <div class="popup__div">
            <div class="timer">
              <div class="timer__value"></div>
            </div>
            <p>Your question here ...</p>
            <div class="buttons">

              <template id="choice__template">
                <label>
                  <div>button label text here...</div>
                  <input type="radio" name="choice">
                </label>
              </template>

            </div>
          </div>
        </template>
      </div>
    </div>

    <shammas-controller></shammas-controller>
  </div>
`;
export default template;
