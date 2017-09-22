export const MODAL_CONSTRUCT = 'MODAL_CONSTRUCT';
export const MODAL_TOGGLE = 'MODAL_TOGGLE';

export function constructModal(modalConfig) {
  return {
    type: MODAL_CONSTRUCT,
    payload: modalConfig
  };
}

export function toggleModal() {
  return {
    type: MODAL_TOGGLE
  };
}
