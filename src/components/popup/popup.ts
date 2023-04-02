import {
  Interaction,
  InteractionPosition,
  VideoNode,
} from "../../models/project";
import { Selectors as S } from "../../models/player";
import { nameComponent, percentageBetween } from "../../utils/helpers";
import template from "./popup.template";

export class Popup extends HTMLElement {
  private shadow: ShadowRoot;
  private templateClone: HTMLTemplateElement;
  private popupWrapper: HTMLDivElement;
  private timer: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;
    this.templateClone = this.selector(S.POPUP_TMP) as HTMLTemplateElement;
    this.popupWrapper = this.selector(S.POPUP_WRAPPER) as HTMLDivElement;
  }

  // ==========================================================================
  //  0. SYNTAXIC SUGAR
  // ==========================================================================

  private selector(string: string) {
    return this.shadow.querySelector(string);
  }

  private selectorAll(string: string) {
    return this.shadow.querySelectorAll(string);
  }

  // ==========================================================================
  //  1. EXPOSED METHOD
  // ==========================================================================

  buildPopup(video: VideoNode) {
    this.popupWrapper.replaceChildren();
    const template = this.templateClone.content.cloneNode(true) as HTMLElement;
    template.querySelector(S.QUESTION).innerText = video.animation.title || "";
    const buttonsWrapper: HTMLElement = template.querySelector(S.POPUP_BUTTONS);
    this.timer = template.querySelector(S.TIMER_VALUE) as HTMLDivElement

    if (video.interactions && buttonsWrapper) {
      this.createButtons(video.interactions, buttonsWrapper);
    }
    this.popupWrapper.append(template);
  }

  updateTimer(currentTime: number, duration: number, eventStartTime: number) {
    const width =
      100 - percentageBetween(currentTime, eventStartTime, duration);
    this.timer.style.width = `${width}%`;
  }

  togglePopup(position: InteractionPosition) {
    const cssClass = position.toUpperCase();
    this.selector(S.POPUP_DIV).classList.toggle(cssClass);
  }

  // ==========================================================================
  //  2. BUTTONS MANAGEMENT
  // ==========================================================================

  private createButtons(
    interactions: Interaction[],
    buttonsWrapper: HTMLElement
  ) {
    interactions?.forEach((interaction) => {
      const button = this.createButton(interaction);
      buttonsWrapper.append(button);
    });
  }

  private createButton(interaction: Interaction) {
    const buttonTmp = this.templateClone.content.querySelector(
      S.BUTTON_TMP
    ) as HTMLTemplateElement;
    const button = buttonTmp.content.cloneNode(true) as HTMLElement;
    button.querySelector(S.BUTTON_INPUT).value = interaction.id;
    button.querySelector(S.BUTTON_CONTENT).innerHTML = interaction.content;
    return button;
  }
}

customElements.define(nameComponent("popup"), Popup);
