import { COMPONENT_BASE_NAME } from "../utils/helpers";

export enum PlayerEvents {
  VIDEO_END = `${COMPONENT_BASE_NAME}-video-end`,
  SEQUENCE_STARTED = `${COMPONENT_BASE_NAME}-sequence-started`,
  LAST_SEQUENCE_REACHED = `${COMPONENT_BASE_NAME}-lastSequenceReached`,
}
