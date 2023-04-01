import { VideoNode, Interaction } from "../models/project";
import { Selectors as S } from "../models/player";
const SELECTED_NO_DOT = S.SELECTED.replace(".", "");

class Popup {
  private templateClone: Node;
  private popupWrapper: HTMLDivElement;
  private shadow: ShadowRoot;

  constructor(
    template: HTMLTemplateElement,
    popupWrapperElement: HTMLDivElement,
    shadow: ShadowRoot
  ) {
    this.templateClone = template.content.cloneNode(true);
    this.popupWrapper = popupWrapperElement;
    this.shadow = shadow;
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
  //  1. EVENTLISTENER MANAGEMENT
  // ==========================================================================

  private getEventListener(button: HTMLButtonElement) {
    return () => {
      const lastSelection = this.shadow.querySelector(S.SELECTED);
      if (lastSelection) lastSelection.classList.remove(SELECTED_NO_DOT);
      button.classList.add(SELECTED_NO_DOT);
    };
  }

  // ==========================================================================
  //  2. PRIVATE HELPERS
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
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = interaction.content;
    button.value = interaction.id;
    button.addEventListener("click", this.getEventListener(button));
    return button;
  }
}

export default Popup;
