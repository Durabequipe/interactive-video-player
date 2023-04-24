import style from './popup.style';
import  '../controller/controller';

const template = document.createElement("template");
const templateString = `
<style>${style}</style>
<div id="popup__wrapper">
  <template id="popup__template">

    <div class="popup__div">

      <!--========================>
      <--- BUTTONS 
      <=========================-->
      <div class="buttons">
        <template id="choice__template">
          <label>
            <div>... BUTTON LABEL TEXT HERE ...</div>
            <input type="radio" name="choice">
          </label>
        </template>
      </div>

    </div>
  </template>
</div>
`;

template.innerHTML = templateString

export default template;
