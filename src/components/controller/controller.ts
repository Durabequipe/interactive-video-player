import template from "./controller.template";
import { Selectors as S } from "../../models/player";
import { nameComponent } from "../../utils/helpers";

export class Controller extends HTMLElement {
  private currentVideoTagIndex = 0;
  private videoTags: NodeListOf<HTMLVideoElement>;
  private shadow: ShadowRoot;
  private toggleButton: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;
    this.videoTags = this.parentNode.querySelectorAll(S.VIDEO);
    this.toggleButton = this.shadow.querySelector("#toggle");
    this.toggleButton.addEventListener("click", () => {
      const tag = this.videoTags[this.currentVideoTagIndex];
      tag.paused ? tag.play() : tag.pause();
    });
  }

  setCurrentVideoTagIndex(index: number) {
    this.currentVideoTagIndex = index;
  }
}

customElements.define(nameComponent("controller"), Controller);
