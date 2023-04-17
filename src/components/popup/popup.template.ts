import style from './popup.style';
import { removeHTMLComments } from '../../utils/helpers';
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

const templateWithoutComments = removeHTMLComments(templateString);
template.innerHTML = templateWithoutComments

export default template;
