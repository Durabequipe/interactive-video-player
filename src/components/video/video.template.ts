import style from "./video.style";

const template = document.createElement("template");
const templateString = `
<style>${style}</style>
<div>
  <video width="100%" class="video-1 is-primary-video" webkit-playsinline playsinline>
    <source type="video/mp4">
    Your browser does not support the video tag.
  </video>

  <video width="100%"  class="video-2" webkit-playsinline playsinline>
    <source type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
`;

template.innerHTML = templateString;

export default template;
