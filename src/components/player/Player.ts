import { Project } from "../../models/project";
import template from "./player.template";
import globalStyle from "../../utils/globalStyle";
import { Video } from "../video/video";
import { COMPONENT_NAME as N } from "../../utils/helpers";
import { Icons, Selectors as S } from "../../models/player";
import { Controller } from "../controller/controller";

export class Player extends HTMLElement {
  private project: Project;
  private videoPlayers: Video;
  private shadow: ShadowRoot;
  private controller: Controller;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;

    this.controller = this.selector(N.CONTROLLER) as Controller;

    const style = document.createElement("style");
    style.innerText = globalStyle;
    document.querySelector(":root").appendChild(style);
    this.videoPlayers = this.selector(N.VIDEO) as Video;
  }

  // ==========================================================================
  //  0. SYNTAXIC SUGAR
  // ==========================================================================

  private selector(string: string) {
    return this.shadow.querySelector(string);
  }

  // ==========================================================================
  //  1. EXPOSED METHOD
  // ==========================================================================

  initProject(project: Project, isMobile: boolean, firstVideoId?: string) {
    this.project = project;
    this.videoPlayers.init(project, this);
    if (firstVideoId) {
      this.videoPlayers.play(firstVideoId, true, isMobile);
    } else {
      this.videoPlayers.play(this.project.entrypointId, true, isMobile);
    }
  }

  playVideo(videoId: string, isMobile: boolean) {
    this.videoPlayers.play(videoId, false, isMobile);
  }

  togglePlay() {
    const videoTag = this.videoPlayers.getCurrentVideoTag();
    if (videoTag) {
      if (videoTag.paused) {
        this.controller.toggleButton.querySelector(S.ICON).src = Icons.PAUSE;
        this.controller.toggleButton.querySelector(S.ICON).alt = "pause";
      } else {
        this.controller.toggleButton.querySelector(S.ICON).src = Icons.PLAY;
        this.controller.toggleButton.querySelector(S.ICON).alt = "play";
      }
      videoTag.paused ? videoTag.play() : videoTag.pause();
    }
  }
}

customElements.define(N.PLAYER, Player);
