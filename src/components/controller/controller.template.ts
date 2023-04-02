import style from './controller.style';

const template = document.createElement("template");
template.innerHTML = `
  <style>${style}</style>
  <div class="controller__wrapper">
    <button id="toggle">play/pause</button>
  </div>
`;
export default template;
