import style from "./video.style";
import { removeHTMLComments } from "../../utils/helpers";

const template = document.createElement("template");
const templateString = `
<style>${style}</style>
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
`;

const templateWithoutComments = removeHTMLComments(templateString);
template.innerHTML = templateWithoutComments;

export default template;