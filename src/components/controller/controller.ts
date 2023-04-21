import template from "./controller.template";
import { Selectors as S } from "../../models/player";
import { Video } from "../video/video";
import { COMPONENT_NAME as N } from "../../utils/helpers";
import { KeydownHandler } from "../../utils/KeydownHandler";


export class Controller extends HTMLElement {
  private currentVideoTagIndex = 0;
  private videoTags: NodeListOf<HTMLVideoElement>;
  private shadow: ShadowRoot;
  private toggleButton: HTMLButtonElement;
  private volumeButton: HTMLButtonElement;
  private volumeInput: HTMLInputElement;
  private progressBar: HTMLInputElement;
  private hideTimeout: number;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;

    const videoWrapper =this.parentNode.querySelector(N.VIDEO) as Video;
    this.videoTags = videoWrapper.shadow.querySelectorAll(S.VIDEO)

    // const keydownHandler = new KeydownHandler(this.videoTags);
    // keydownHandler.attachEvent();

    this.toggleButton = this.shadow.querySelector(S.TOGGLE);
    this.toggleButton.addEventListener("click", () => {
      const tag = this.videoTags[this.currentVideoTagIndex];
      tag.paused ? tag.play() : tag.pause();
      if (tag.paused) {
        this.toggleButton.querySelector('img').src = "https://api.iconify.design/ic/round-play-arrow.svg?color=white&width=30"
        this.toggleButton.querySelector('img').alt = "play"
      } else {
        this.toggleButton.querySelector('img').src = "https://api.iconify.design/material-symbols/pause-rounded.svg?color=white&height=30"
        this.toggleButton.querySelector('img').alt = "pause"
      }
      this.toggleButton.blur();
    });

    this.volumeButton = this.shadow.querySelector(S.VOLUME);
    this.volumeButton.addEventListener("click", () => {
      const tag = this.videoTags[this.currentVideoTagIndex];
      if (tag.muted) {
        tag.muted = false;
        // this.volumeButton.innerText = "Mute";
        this.volumeButton.querySelector('img').src = "https://api.iconify.design/material-symbols/volume-up-rounded.svg?color=white&width=30"
        this.volumeButton.querySelector('img').alt = "unmuted"
        if (this.volumeInput.value == "0") {
          this.volumeInput.value = "100";
        }
      } else {
        tag.muted = true;
        // this.volumeButton.innerText = "Unmute";
        this.volumeButton.querySelector('img').src = "https://api.iconify.design/material-symbols/volume-mute-rounded.svg?color=white&width=30"
        this.volumeButton.querySelector('img').alt = "muted"
        this.volumeInput.value = "0";
      }
    });

    this.progressBar = this.shadow.querySelector(S.PROGRESS_BAR);
    this.progressBar.addEventListener("input", () => {
      const tag = this.videoTags[this.currentVideoTagIndex];
      const time = tag.duration * (parseInt(this.progressBar.value) / 100);
      tag.currentTime = time;
    });

    this.addEventListenersToVideos();

    const controller = this.shadow.querySelector('.controller__wrapper');
    controller.addEventListener("click", () => {
      this.showController();
    });
    
    this.videoTags.forEach(e => {
      e.addEventListener("mousemove", () => {
        this.showController();
        clearTimeout(this.hideTimeout);
        this.hideTimeout = setTimeout(() => {
          this.hideController();
        }, 1500);
      });
    });
  }

  private addEventListenersToVideos(): void {
    this.videoTags.forEach((videoTag: HTMLVideoElement) => {
      videoTag.addEventListener("timeupdate", () => {
        const currentTime = videoTag.currentTime;
        const duration = videoTag.duration;
        let progress = (currentTime / duration) * 100;
        if(!duration) { progress = 0; };
        this.progressBar.value = progress.toString();
      });
    });
  }

  private showController(): void {
    const controller = this.shadow.querySelector('.controller__wrapper');
    controller.classList.add("visible");
  }
  
  private hideController(): void {
    const controller = this.shadow.querySelector('.controller__wrapper');
    if (!controller.matches(":hover")) {
      controller.classList.remove("visible");
    }
  }

  setCurrentVideoTagIndex(index: number) {
    this.currentVideoTagIndex = index;
  }
}

customElements.define(N.CONTROLLER, Controller);
