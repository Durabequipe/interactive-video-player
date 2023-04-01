import { VideoNode, Interaction } from "../models/project";
import { Selectors as S } from "../models/player";

class Popup {
  private templateClone: HTMLTemplateElement;
  private popupWrapper: HTMLDivElement;

  constructor(
    template: HTMLTemplateElement,
    popupWrapperElement: HTMLDivElement,
  ) {
    this.templateClone = template.content.cloneNode(true) as HTMLTemplateElement;
    this.popupWrapper = popupWrapperElement;
  }

  // ==========================================================================
  //  0. EXPOSED METHOD
  // ==========================================================================

  buildPopup(video: VideoNode) {
    this.popupWrapper.replaceChildren();

    const template = this.templateClone.cloneNode(true) as HTMLElement;
    template.querySelector(S.QUESTION).innerText = video.animation.title || "";
    const buttonsWrapper: HTMLElement = template.querySelector(S.POPUP_BUTTONS);

    if (video.interactions && buttonsWrapper) {
      this.createButtons(video.interactions, buttonsWrapper);
    }
    this.popupWrapper.append(template);
  }

  // ==========================================================================
  //  1. BUTTONS MANAGEMENT
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

  private createButton(interaction: Interaction,) {
    const buttonTmp = this.templateClone.querySelector(S.BUTTON_TMP) as HTMLTemplateElement;
    const button = buttonTmp.content.cloneNode(true) as HTMLElement
    button.querySelector(S.BUTTON_INPUT).value = interaction.id
    button.querySelector(S.BUTTON_CONTENT).innerHTML = interaction.content;
    return button;
  }

}

export default Popup;
