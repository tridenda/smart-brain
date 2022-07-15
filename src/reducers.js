import { CHANGE_IMAGE_LINK_INPUT } from "./constants";

const initialState = {
  imageLinkInput: "",
};

export const changeImageLinkInput = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_IMAGE_LINK_INPUT:
      return Object.assign({}, state, { imageLinkInput: action.payload });
    default:
      return state;
  }
};
