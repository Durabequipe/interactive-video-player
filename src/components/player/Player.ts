import { Project } from "../../models/project";
import template from "./player.template";
import globalStyle from "../../utils/globalStyle";
import { Video } from "../video/video";
import { COMPONENT_NAME as N } from "../../utils/helpers";

export class Player extends HTMLElement {
  private project: Project;
  private shadow: ShadowRoot;
  private videoPlayers: Video;
  public sddColor: string;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;

    const style = document.createElement("style");
    style.innerText = globalStyle;
    document.querySelector(':root').appendChild(style)
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

  initProject(project: Project, ifMobile: boolean, sddColor: string, firstVideoId?: string) {
    this.project = project;
    this.sddColor = sddColor;
    this.videoPlayers.init(project,this);
    if(firstVideoId){
      this.videoPlayers.play(firstVideoId, true, ifMobile);
    } else {
      this.videoPlayers.play(this.project.entrypointId, true, ifMobile);
    }
  }

  public playVideo(videoId: string, ifMobile: boolean) {
    this.videoPlayers.play(videoId, false, ifMobile);
  }

}

customElements.define(N.PLAYER, Player);
