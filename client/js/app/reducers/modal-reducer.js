import * as modalActions from '../actions/modal-actions';

export const initialModalState = () => {
  return {
    isModalOpen: false,
    modalType: '',
    title: '',
  };
}

const modalReducer = (state = initialModalState(), action) => {

  switch (action.type) {
    case modalActions.OPEN_MODAL:
      return Object.assign({}, state, {
        isModalOpen: true,
        modalType: action.modalType,
      });
    case modalActions.CLOSE_MODAL:
      return Object.assign({}, state, {
        isModalOpen: false,
        modalType: '',
      });
    default:
      return state;
  }
}

export default modalReducer;