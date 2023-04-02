import { Project, VideoNode } from "../../models/project";
import { Selectors as S, VideoEvent } from "../../models/player";
import Popup from "../../utils/Popup";
import { percentageBetween, randomInt, videoToMap } from "../../utils/helpers";
import template from "./player.template";
import globalStyle from "../../utils/globalStyle";
import { Controller } from "../controller/controller";

export class Player extends HTMLElement {
  private project: Project;
  private currentVideoTagIndex = 0;
  private videoTags: NodeListOf<HTMLVideoElement>;
  private videos: Map<string, VideoNode>;
  private shadow: ShadowRoot;
  private popup: Popup;
  private controller: Controller;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;

    const style = document.createElement("style");
    style.innerText = globalStyle;
    this.parentNode.appendChild(style);

    this.controller = this.selector('shammas-controller') as Controller

    this.videoTags = this.selectorAll(S.VIDEO) as NodeListOf<HTMLVideoElement>;

    const selectors = [S.POPUP_TMP, S.POPUP_WRAPPER];
    const tmp = this.selector(selectors[0]) as HTMLTemplateElement;
    const div = this.selector(selectors[1]) as HTMLDivElement;
    const popup = new Popup(tmp, div);
    this.popup = popup;
  }

  // ==========================================================================
  //  0. SYNTAXIC SUGAR
  // ==========================================================================

  private selector(string: string) {
    return this.shadow.querySelector(string);
  }

  private getCurrentVideoTag() {
    return this.videoTags[this.currentVideoTagIndex] as HTMLVideoElement;
  }

  private selectorAll(string: string) {
    return this.shadow.querySelectorAll(string);
  }

  private addEvent(
    event: VideoEvent,
    callback: (this: HTMLVideoElement, ev: Event) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.getCurrentVideoTag().addEventListener(event, callback, options);
  }

  private removeEvent(
    event: VideoEvent,
    callback: (this: HTMLVideoElement, ev: Event) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.getCurrentVideoTag().removeEventListener(event, callback, options);
  }

  // ==========================================================================
  //  1. EXPOSED METHOD
  // ==========================================================================

  initProject(project: Project) {
    this.project = project;
    this.videos = videoToMap(project.videos);
    this.play(this.project.entrypointId, true);
  }

  async play(id: string, firstPlay = false) {
    const currentVideo: VideoNode = this.videos.get(id);
    const source = this.getCurrentVideoTag().querySelector(S.VIDEO_SOURCE);
    source.src = currentVideo.paths[0];
    this.getCurrentVideoTag().load();

    const fn = async () => {
      await this.SetEventsListener(currentVideo);
    };

    if (firstPlay) {
      return this.addEvent(VideoEvent.CANPLAY, fn, {
        once: true,
      });
    }

    await this.getCurrentVideoTag().play();
    await this.SetEventsListener(currentVideo);
  }

  // ==========================================================================
  //  3. EVENTLISTENER MANAGEMENT
  // ==========================================================================

  private async SetEventsListener(currentVideo: VideoNode) {
    const duration = this.getCurrentVideoTag().duration;
    const eventStartTime = duration - currentVideo?.animation?.duration ?? 0;

    if (eventStartTime > 0) {
      const timerEvent = this.getTimerListener(duration, eventStartTime);

      this.addEvent(
        VideoEvent.TIMEUPDATE,
        this.getTimeUpdateListener(eventStartTime, currentVideo, timerEvent)
      );

      this.addEvent(
        VideoEvent.ENDED,
        this.getEndVideoListener(currentVideo, timerEvent),
        { once: true }
      );
    }
  }

  private getTimeUpdateListener(
    eventStartTime: number,
    currentVideo: VideoNode,
    timerEvent: (e: any) => void
  ) {
    const fn = (e: any) => {
      if (e.target.currentTime >= eventStartTime) {
        this.popup.buildPopup(currentVideo);

        this.addEvent(VideoEvent.TIMEUPDATE, timerEvent);
        this.removeEvent(VideoEvent.TIMEUPDATE, fn);

        setTimeout(() => {
          this.togglePopup(currentVideo);
        }, 100);
      }
    };
    return fn;
  }

  private getTimerListener(duration: number, eventStartTime: number) {
    return (e: any) => {
      const timer: HTMLElement = this.shadow.querySelector(S.TIMER_VALUE);
      const time = e.target.currentTime;
      const width = 100 - percentageBetween(time, eventStartTime, duration);
      timer.style.width = `${width}%`;
    };
  }

  private getEndVideoListener(
    currentVideo: VideoNode,
    timerEvent: (e: any) => void
  ) {
    return () => {
      this.removeEvent(VideoEvent.TIMEUPDATE, timerEvent);
      const max = currentVideo?.interactions?.length - 1 ?? 0;
      const min = 0;
      if (max > 0) {
        const next = (this.selector(S.SELECTED) as HTMLInputElement)?.value;
        const nextVideoIndex = next
          ? next
          : currentVideo.interactions[String(randomInt(min, max))].id;
        this.switchCurrentVideoTag();
        this.play(nextVideoIndex);
        this.switchVideoTag();
      }
      this.togglePopup(currentVideo);
    };
  }

  // ==========================================================================
  //  4. PRIVATE HELPERS
  // ==========================================================================

  private togglePopup(currentVideo: VideoNode) {
    const cssClass = currentVideo.animation.position.toUpperCase();
    this.selector(S.POPUP_DIV).classList.toggle(cssClass);
  }

  private switchVideoTag() {
    this.videoTags[0].classList.toggle(S.PRIMARY_VIDEO);
    this.videoTags[1].classList.toggle(S.PRIMARY_VIDEO);
  }

  private switchCurrentVideoTag() {
    const current = Boolean(this.currentVideoTagIndex);
    const newValue = Number(!current)
    this.controller.setCurrentVideoTagIndex(newValue)
    this.currentVideoTagIndex = newValue;
  }
}

customElements.define("shammas-player", Player);
