import { CHANGE_IMAGE_LINK_INPUT } from "./constants";

export const setImageLinkInput = (text) => ({
  type: CHANGE_IMAGE_LINK_INPUT,
  payload: text,
});
