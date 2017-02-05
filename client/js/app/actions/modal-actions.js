/* Modal */
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/* Modal functions */
export const openModal = (modalType) => {
  return {
    type: OPEN_MODAL,
    modalType: modalType
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

