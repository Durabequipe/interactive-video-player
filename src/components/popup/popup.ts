import {
  Interaction,
  InteractionPosition,
  VideoNode,
} from "../../models/project";
import { Selectors as S } from "../../models/player";
import template from "./popup.template";
import { COMPONENT_NAME as N } from "../../utils/helpers";
import { Video } from "../video/video";

export class Popup extends HTMLElement {
  public shadow: ShadowRoot;
  private templateClone: HTMLTemplateElement;
  private popupWrapper: HTMLDivElement;
  private videoTag: Video;
  public historicVideos: Array<any> = [];

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.shadow = shadow;
    this.templateClone = this.selector(S.POPUP_TMP) as HTMLTemplateElement;
    this.popupWrapper = this.selector(S.POPUP_WRAPPER) as HTMLDivElement;
    this.videoTag = this.parentElement.querySelector('shammas-video');
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

  togglePopup(position?: InteractionPosition) {
    if(position){
      const cssClass = position.toUpperCase();
      this.selector(S.POPUP_DIV).classList.toggle(cssClass);
      const buttonSel = this.shadow.querySelector('.buttons')
      buttonSel.addEventListener('click', () => {
        this.videoTag.getCurrentVideoTag().play();
      })
    }
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

    const buttonInput = button.querySelector(S.BUTTON_INPUT) as HTMLInputElement;
    buttonInput.value = interaction.id;
    button.querySelector(S.BUTTON_CONTENT).innerHTML = interaction.content;


    const label = button.querySelector(S.BUTTON_CONTENT).parentElement;
    // console.log(this.themeColor)
    
    label.addEventListener('click', () => {
      label.style.backgroundColor = this.videoTag.player.sddColor;
      label.classList.add('clicked');
    });
    
    label.addEventListener('mouseenter', () => {
      if (label.classList.value != 'clicked') {
        label.style.backgroundColor = this.videoTag.player.sddColor;
      }
    });
    
    label.addEventListener('mouseout', () => {
      if(label.classList.value != 'clicked') {
        label.style.backgroundColor = '';
      }
    });

    
    // const checkedLabels = document.querySelectorAll('#popup__wrapper label:has(input:checked)');
    // checkedLabels.forEach(label => {
    //   // label.style.background = 'red';
    //   // label.style.opacity = '1';
    // });

    button.querySelector('label').addEventListener("mousedown", (e) => {
      e.stopPropagation()
      if(buttonInput.value != this.historicVideos[this.historicVideos.length - 1]){
        this.historicVideos.push(buttonInput.value);
      }
    });
  
    return button;
  }

  public getHistoricVideos(): Array<any> {
    console.log(this.historicVideos)
    return this.historicVideos;
  }
}

customElements.define(N.POPUP, Popup);
