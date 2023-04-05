import style from './controller.style';

const template = document.createElement("template");
template.innerHTML = `
  <style>${style}</style>
  <div class="controller__wrapper">
    <button id="toggle">play/pause</button>
    <button id="mute">Mute</button>
    <input id="volume" type="range" name="volume" min="0" max="100" value="100">
    <button id="avanceRapide">Avancer</button>
    <div class="progressBar_wrapper">
      <input id="progressBar" type="range" name="progressBar" min="0" max="100" value="0">
    </div>
  </div>
`;
export default template;
