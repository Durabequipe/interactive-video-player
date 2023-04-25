import template from "./controller.template";
import {
  Selectors as S,
  Icons,
  MouseEvents,
  ProgressBarEvents,
  VideoEvent,
} from "../../models/player";
import { Video } from "../video/video";
import { COMPONENT_NAME as N } from "../../utils/helpers";
import { KeydownHandler } from "../../utils/KeydownHandler";

export class Controller extends HTMLElement {
  private currentVideoTagIndex = 0;
  private videoTags: NodeListOf<HTMLVideoElement>;
  public shadow: ShadowRoot;
  public toggleButton: HTMLButtonElement;
  public volumeButton: HTMLButtonElement;
  private progressBar: HTMLInputElement;
  private hideTimeout: NodeJS.Timeout;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;

    const videoWrapper = this.parentNode.querySelector(N.VIDEO) as Video;
    this.videoTags = videoWrapper.shadow.querySelectorAll(S.VIDEO);

    this.toggleButton = this.shadow.querySelector(S.TOGGLE);
    this.toggleButton.addEventListener(MouseEvents.CLICK, () => {
      const tag = this.videoTags[this.currentVideoTagIndex];
      tag.paused ? tag.play() : tag.pause();
      if (tag.paused) {
        this.toggleButton.querySelector(S.ICON).src = Icons.PLAY;
        this.toggleButton.querySelector(S.ICON).alt = "play";
      } else {
        this.toggleButton.querySelector(S.ICON).src = Icons.PAUSE;
        this.toggleButton.querySelector(S.ICON).alt = "pause";
      }
      this.toggleButton.blur();
    });

    this.volumeButton = this.shadow.querySelector(S.VOLUME);
    this.volumeButton.addEventListener(MouseEvents.CLICK, () => {
      const tag = this.videoTags[this.currentVideoTagIndex];

      if (tag.muted) {
        this.videoTags[0].muted = false;
        this.videoTags[1].muted = false;
        this.volumeButton.querySelector(S.ICON).src = Icons.VOLUME_UP;
        this.volumeButton.querySelector(S.ICON).alt = "unmuted";
      } else {
        this.videoTags[0].muted = true;
        this.videoTags[1].muted = true;
        this.volumeButton.querySelector(S.ICON).src = Icons.VOLUME_MUTE;
        this.volumeButton.querySelector(S.ICON).alt = "muted";
      }
    });

    this.progressBar = this.shadow.querySelector(S.PROGRESS_BAR);
    this.progressBar.addEventListener(MouseEvents.CLICK, (e) => {
      e.stopPropagation();
    });
    this.progressBar.addEventListener(ProgressBarEvents.INPUT, () => {
      const tag = this.videoTags[this.currentVideoTagIndex];
      const time = tag.duration * (parseInt(this.progressBar.value) / 100);
      if (time != tag.duration) {
        tag.currentTime = time;
      }
    });

    this.addEventListenersToVideos();

    const controller = this.shadow.querySelector(S.CONTROLLER_WRAPPER);
    controller.addEventListener(MouseEvents.CLICK, () => {
      this.showController();
    });

    this.videoTags.forEach((e) => {
      e.addEventListener(MouseEvents.MOVE, () => {
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
      videoTag.addEventListener(VideoEvent.TIMEUPDATE, () => {
        const currentTime = videoTag.currentTime;
        const duration = videoTag.duration;
        let progress = (currentTime / duration) * 100;
        if (!duration) {
          progress = 0;
        }
        this.progressBar.value = progress.toString();
      });
    });
  }

  private showController(): void {
    const controller = this.shadow.querySelector(S.CONTROLLER_WRAPPER);
    controller.classList.add(S.VISIBLE.replace('.',''));
  }

  private hideController(): void {
    const controller = this.shadow.querySelector(S.CONTROLLER_WRAPPER);
    if (controller) {
      let hasClass = false;
      controller.classList.forEach((value) => {
        if (value == S.VISIBLE.replace('.','')) hasClass = true;
      });
      if (hasClass) controller.classList.remove(S.VISIBLE.replace('.',''));
    }
  }

  setCurrentVideoTagIndex(index: number) {
    this.currentVideoTagIndex = index;
  }
}

customElements.define(N.CONTROLLER, Controller);
