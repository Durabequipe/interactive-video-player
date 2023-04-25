import { Interaction, VideoNode } from "../../models/project";
import { Selectors as S, MouseEvents } from "../../models/player";
import template from "./popup.template";
import { COMPONENT_NAME as N } from "../../utils/helpers";
import { Video } from "../video/video";

export class Popup extends HTMLElement {
  public shadow: ShadowRoot;
  private templateClone: HTMLTemplateElement;
  private popupWrapper: HTMLDivElement;
  private videoTag: Video;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;
    this.templateClone = this.selector(S.POPUP_TMP) as HTMLTemplateElement;
    this.popupWrapper = this.selector(S.POPUP_WRAPPER) as HTMLDivElement;
    this.videoTag = this.parentElement.querySelector(N.VIDEO);
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

  buildPopup(video: VideoNode) {
    this.popupWrapper.replaceChildren();
    const template = this.templateClone.content.cloneNode(true) as HTMLElement;
    const buttonsWrapper: HTMLElement = template.querySelector(S.POPUP_BUTTONS);

    if (video.interactions && buttonsWrapper) {
      this.createButtons(video.interactions, buttonsWrapper);
    }
    this.popupWrapper.append(template);
  }

  togglePopup() {
    this.selector(S.POPUP_DIV).classList.toggle(S.BOTTOM.replace(".", ""));
    const buttonSel = this.shadow.querySelectorAll(`${S.POPUP_BUTTONS} label.button`);
    console.log(buttonSel)
    buttonSel.forEach((b) => {
      b.addEventListener(
        MouseEvents.CLICK,
        () => {
          this.videoTag.getCurrentVideoTag().play();
        },
        { once: true }
      );
    });
  }

  // ==========================================================================
  //  2. BUTTONS MANAGEMENT
  // ==========================================================================

  private createButtons(
    interactions: Interaction[],
    buttonsWrapper: HTMLElement
  ) {
    const isEven = interactions.length - (1 % 2) == 0;
    interactions?.forEach((interaction) => {
      const button = this.createButton(interaction);
      buttonsWrapper.append(button);
    });
    if (!isEven && window.innerWidth > 800) {
      const button = this.createFakeButton();
      buttonsWrapper.append(button);
    }
  }

  private createFakeButton() {
    const buttonTmp = this.templateClone.content.querySelector(
      S.BUTTON_TMP
    ) as HTMLTemplateElement;
    buttonTmp.classList.add("fake-button");
    const button = buttonTmp.content.cloneNode(true) as HTMLElement;
    button.querySelector(S.BUTTON_CONTENT).innerHTML = "";

    return button;
  }

  private createButton(interaction: Interaction) {
    const buttonTmp = this.templateClone.content.querySelector(
      S.BUTTON_TMP
    ) as HTMLTemplateElement;
    const button = buttonTmp.content.cloneNode(true) as HTMLElement;
    button.querySelector(S.BUTTON_INPUT).value = interaction.id;
    button.querySelector(S.POPUP_BUTTON).classList.add('button')
    button.querySelector(S.BUTTON_CONTENT).innerHTML = interaction.content;

    const buttonInput = button.querySelector(
      S.BUTTON_INPUT
    ) as HTMLInputElement;
    buttonInput.value = interaction.id;
    button.querySelector(S.BUTTON_CONTENT).innerHTML = interaction.content;

    return button;
  }
}

customElements.define(N.POPUP, Popup);
