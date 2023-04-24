import { Project, VideoNode } from "../../models/project";
import { PlayerEvents } from "../../models/events";
import { Selectors as S, VideoEvent,Icons } from "../../models/player";
import {
  randomInt,
  videoToMap,
  COMPONENT_NAME as N,
} from "../../utils/helpers";
import template from "./video.template";
import { Controller } from "../controller/controller";
import { Popup } from "../popup/popup";
import { Player } from "../player/Player";

export class Video extends HTMLElement {
  private currentVideoTagIndex = 0;
  public videoTags: NodeListOf<HTMLVideoElement>;
  private videos: Map<string, VideoNode>;
  public shadow: ShadowRoot;
  private popup: Popup;
  private controller: Controller;
  public player: Player;
  private isMobile: boolean;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;

    this.controller = this.parentNode.parentNode.querySelector(
      N.CONTROLLER
    ) as Controller;
    this.popup = this.parentNode.querySelector(N.POPUP) as Popup;
    this.videoTags = this.selectorAll(S.VIDEO) as NodeListOf<HTMLVideoElement>;
  }

  // ==========================================================================
  //  0. SYNTAXIC SUGAR
  // ==========================================================================

  private selector(string: string) {
    return this.shadow.querySelector(string);
  }

  public getCurrentVideoTag() {
    return this.videoTags[this.currentVideoTagIndex] as HTMLVideoElement;
  }

  private selectorAll(string: string) {
    return this.shadow.querySelectorAll(string);
  }

  private emitEvent(eventType: PlayerEvents, payload?: object) {
    const customEvent = new CustomEvent(eventType, { detail: payload });
    this.player.dispatchEvent(customEvent);
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

  init(project: Project, player: Player) {
    this.videos = videoToMap(project.videos);
    this.player = player;
  }

  async play(id: string, firstPlay = false, isMobile: boolean) {
    const currentVideo: VideoNode = this.videos.get(id);
    const isLastSequence = currentVideo?.interactions ? false : true;
    const source = this.getCurrentVideoTag().querySelector(S.VIDEO_SOURCE);

    this.isMobile = isMobile;
    const index = Number(this.isMobile);
    source.src = currentVideo.paths[index] || currentVideo.paths[0];

    this.getCurrentVideoTag().load();

    const fn = async () => {
      await this.SetEventsListener(currentVideo, isLastSequence);
    };

    if (firstPlay) {
      return this.addEvent(VideoEvent.CANPLAY, fn, {
        once: true,
      });
    }

    if (isLastSequence) {
      this.emitEvent(PlayerEvents.LAST_SEQUENCE_REACHED);
    }

    await this.getCurrentVideoTag().play();
    await this.SetEventsListener(currentVideo, isLastSequence);
  }

  // ==========================================================================
  //  2. EVENTLISTENER MANAGEMENT
  // ==========================================================================

  private async SetEventsListener(
    currentVideo: VideoNode,
    isLastSequence = false
  ) {
    const duration = this.getCurrentVideoTag().duration;
    const eventStartTime = duration - 0.5;

    if (isLastSequence) {
      this.addEvent(
        VideoEvent.TIMEUPDATE,
        this.getSequenceEndListener(duration)
      );
    }

    this.addEvent(
      VideoEvent.TIMEUPDATE,
      this.getVideoStartedListener(currentVideo)
    );

    if (eventStartTime > 0) {
      const timerEvent = this.getTimerListener();

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

    let pauseEventTriggered = false;

    const timerEvent = (e: any) => {
      const currentTime = e.target.currentTime;
      const remainingTime = Math.abs(duration - currentTime);
      const isLastSequence = currentVideo?.interactions ? false : true;
      if (!isLastSequence) {
        if (remainingTime <= 0.5 && !pauseEventTriggered) {
          this.controller.toggleButton.querySelector(S.ICON).src = Icons.PLAY;
          this.controller.toggleButton.querySelector(S.ICON).alt = "play";

          this.getCurrentVideoTag().pause();
          pauseEventTriggered = true;
        }
      }
    };
    this.addEvent(VideoEvent.TIMEUPDATE, timerEvent);
  }

  private getSequenceEndListener(duration: number) {
    return (e: any) => {
      if (e.target.currentTime == duration) {
        this.emitEvent(PlayerEvents.VIDEO_END);
      }
    };
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

        const isLastSequence = currentVideo?.interactions ? false : true;
        setTimeout(() => {
          if (!isLastSequence) {
            this.popup.togglePopup();
          }
        }, 100);
      }
    };
    return fn;
  }

  private getVideoStartedListener(video: VideoNode) {
    const fn = (e: any) => {
      if (e.target.currentTime > 0) {
        this.emitEvent(PlayerEvents.SEQUENCE_STARTED, video);
        this.getCurrentVideoTag().removeEventListener(
          VideoEvent.TIMEUPDATE,
          fn
        );
      }
    };
    return fn;
  }

  private getTimerListener() {
    return (e: any) => {
      return e.target.currentTime;
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
      if (max >= 0) {
        const next = (
          this.popup.shadow.querySelector(S.SELECTED) as HTMLInputElement
        )?.value;
        const nextVideoIndex = next
          ? next
          : currentVideo.interactions[String(randomInt(min, max))].id;
        this.switchCurrentVideoTag();
        this.play(nextVideoIndex, false, this.isMobile);
        this.switchVideoTag();
        this.controller.toggleButton.querySelector(S.ICON).src = Icons.PAUSE;
        this.controller.toggleButton.querySelector(S.ICON).alt = "pause";

        this.popup.togglePopup();
      }
    };
  }

  // ==========================================================================
  //  3. PRIVATE HELPERS
  // ==========================================================================

  private switchVideoTag() {
    this.videoTags[0].classList.toggle(S.PRIMARY_VIDEO);
    this.videoTags[1].classList.toggle(S.PRIMARY_VIDEO);
  }

  private switchCurrentVideoTag() {
    const current = Boolean(this.currentVideoTagIndex);
    const newValue = Number(!current);
    this.controller.setCurrentVideoTagIndex(newValue);
    this.currentVideoTagIndex = newValue;
  }
}

customElements.define(N.VIDEO, Video);
