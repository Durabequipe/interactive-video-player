export enum Selectors {
  PRIMARY_VIDEO = "is-primary-video",
  POPUP_TMP = "#popup__template",
  POPUP_WRAPPER = "#popup__wrapper",
  VIDEO = "video",
  POPUP_DIV = ".popup__div",
  VIDEO_SOURCE = "source",
  SELECTED = "input:checked",
  TIMER = ".timer",
  TIMER_VALUE = ".timer__value",
  POPUP_BUTTONS = ".buttons",
  QUESTION = "p",
  BUTTON_TMP = "#choice__template",
  BUTTON_INPUT = "input",
  BUTTON_CONTENT = "div",
  TOGGLE = "#toggle",
  VOLUME = "#mute",
  VOLUME_INPUT = "#volume",
  PROGRESS_BAR = "#progressBar"
}

export enum VideoEvent {
  TIMEUPDATE = "timeupdate",
  ENDED = "ended",
  CANPLAY = "canplay",
}
