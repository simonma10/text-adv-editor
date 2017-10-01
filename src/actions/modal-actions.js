export const MODAL_CONSTRUCT = 'MODAL_CONSTRUCT';
export const MODAL_TOGGLE = 'MODAL_TOGGLE';
export const LOCATION_MODAL_TOGGLE = 'LOCATION_MODAL_TOGGLE';
export const GENERIC_MODAL_TOGGLE = 'GENERIC_MODAL_TOGGLE';

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

export function toggleLocationModal(){
  return {
    type: LOCATION_MODAL_TOGGLE
  }
}

export function toggleGenericModal() {
    return {
        type: GENERIC_MODAL_TOGGLE
    };
}