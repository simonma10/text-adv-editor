export const MODAL_CONSTRUCTED = 'MODAL_CONSTRUCTED';
export const MODAL_ACTIVATED = 'MODAL_ACTIVATED';

export function constructModal({ activate, customStyle, content, canvasOnClick }) {
  return {
    type: MODAL_CONSTRUCTED,
    payload: {
			activate,
			customStyle,
			content,
			canvasOnClick
		}
  };
}

export function activateModal(bool) {
  return {
    type: MODAL_ACTIVATED,
    bool
  };
}
