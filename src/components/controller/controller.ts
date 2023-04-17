import template from "./controller.template";
import { Selectors as S } from "../../models/player";
import { Video } from "../video/video";
import { COMPONENT_NAME as N } from "../../utils/helpers";
import { KeydownHandler } from "../../utils/KeydownHandler";

import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

library.add(faCamera)

const camera = icon({ prefix: 'fas', iconName: 'camera' })

export class Controller extends HTMLElement {
  private currentVideoTagIndex = 0;
  private videoTags: NodeListOf<HTMLVideoElement>;
  private shadow: ShadowRoot;
  private toggleButton: HTMLButtonElement;
  private volumeButton: HTMLButtonElement;
  private volumeInput: HTMLInputElement;
  private progressBar: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;

    const videoWrapper =this.parentNode.querySelector(N.VIDEO) as Video;
    this.videoTags = videoWrapper.shadow.querySelectorAll(S.VIDEO)

    const keydownHandler = new KeydownHandler(this.videoTags);
    keydownHandler.attachEvent();

    this.toggleButton = this.shadow.querySelector(S.TOGGLE);
    this.toggleButton.addEventListener("click", () => {
      const tag = this.videoTags[this.currentVideoTagIndex];
      tag.paused ? tag.play() : tag.pause();
      if (tag.paused) {
        this.toggleButton.innerText = "continuer";
      } else {
        this.toggleButton.innerText = "pause";
      }
      this.toggleButton.blur();
    });

    this.volumeButton = this.shadow.querySelector(S.VOLUME);
    this.volumeButton.addEventListener("click", () => {
      const tag = this.videoTags[this.currentVideoTagIndex];
      if (tag.muted) {
        tag.muted = false;
        this.volumeButton.innerText = "Mute";
        if (this.volumeInput.value == "0") {
          this.volumeInput.value = "100";
        }
      } else {
        tag.muted = true;
        this.volumeButton.innerText = "Unmute";
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

    (this.progressBar as HTMLElement).addEventListener("mouseover", () => {
      this.showController();
    });

    (this.progressBar as HTMLElement).addEventListener("mouseout", () => {
      this.showController();
    });

    // this.progressBar.addEventListener("mouseleave", () => {
    //   this.hideController();
    // })
    
    this.videoTags.forEach(e => {
      e.addEventListener("mousemove", () => {
        this.showController();
      setTimeout(() => {
        this.hideController();
      }, 2000);
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
    // (controller as HTMLElement).style.display = 'block';
    controller.classList.add("visible");
    // (controller as HTMLElement).style.opacity = '0.8';
  }
  
  private hideController(): void {
    const controller = this.shadow.querySelector('.controller__wrapper');
    // (controller as HTMLElement).style.display = 'none';
    controller.classList.remove("visible");
    // (controller as HTMLElement).style.opacity = '0.2';
  }

  setCurrentVideoTagIndex(index: number) {
    this.currentVideoTagIndex = index;
  }
}

customElements.define(N.CONTROLLER, Controller);
