export enum Selectors {
  PRIMARY_VIDEO = "is-primary-video",
  POPUP_TMP = "#popup__template",
  POPUP_WRAPPER = "#popup__wrapper",
  VIDEO = "video",
  POPUP_DIV = ".popup__div",
  POPUP_BUTTON = "label",
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
  PROGRESS_BAR = "#progressBar",
  CONTROLLER_WRAPPER = ".controller__wrapper",
  BOTTOM = ".BOTTOM",
  VISIBLE = ".visible",
  ICON = "img",
}

export enum VideoEvent {
  ABORT = "abort",
  CANPLAY = "canplay",
  CANPLAYTHROUGH = "canplaythrough",
  DURATIONCHANGE = "durationchange",
  EMPTIED = "emptied",
  ENDED = "ended",
  ERROR = "error",
  LOADEDDATA = "loadeddata",
  LOADEDMETADATA = "loadedmetadata",
  LOADSTART = "loadstart",
  PAUSE = "pause",
  PLAY = "play",
  PLAYING = "playing",
  PROGRESS = "progress",
  RATECHANGE = "ratechange",
  SEEKED = "seeked",
  SEEKING = "seeking",
  STALLED = "stalled",
  SUSPEND = "suspend",
  TIMEUPDATE = "timeupdate",
  VOLUMECHANGE = "volumechange",
  WAITING = "waiting",
}

export enum MouseEvents {
  CLICK = "click",
  DBLCLICK = "dblclick",
  DOWN = "mousedown",
  ENTER = "mouseenter",
  LEAVE = "mouseleave",
  MOVE = "mousemove",
  OUT = "mouseout",
  OVER = "mouseover",
  UP = "mouseup",
}

export enum ProgressBarEvents {
  INPUT = 'input'
}

const src = "https://api.iconify.design/";

export enum Icons {
  PAUSE = `${src}material-symbols/pause-rounded.svg?color=white&height=30`,
  PLAY = `${src}ic/round-play-arrow.svg?color=white&width=30`,
  VOLUME_UP = `${src}material-symbols/volume-up-rounded.svg?color=white&width=30`,
  VOLUME_MUTE = `${src}material-symbols/volume-mute-rounded.svg?color=white&width=30`,
}
