import { Project } from "../../models/project";
import template from "./player.template";
import globalStyle from "../../utils/globalStyle";
import { Video } from "../video/video";
import { COMPONENT_NAME as N } from "../../utils/helpers";

export class Player extends HTMLElement {
  private project: Project;
  private shadow: ShadowRoot;
  private videoPlayers: Video;
  /*méthode pub pour démarrer video*/

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

  initProject(project: Project, pathIndex = 0) {
    this.project = project;
    this.videoPlayers.init(project,this);
    this.videoPlayers.play(this.project.entrypointId, true, pathIndex);
  }

  public playVideo(videoId: string, pathIndex = 0) {
    this.videoPlayers.play(videoId, true, pathIndex);
  }
  /**
   * const player = document.querySelector("nom-du-player");
   * player.playVideo("id-de-la-vidéo-à-lire");
   */
}

customElements.define(N.PLAYER, Player);
