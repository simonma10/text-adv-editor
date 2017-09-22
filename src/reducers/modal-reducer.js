import _ from 'lodash';
import { MODAL_CONSTRUCT, MODAL_TOGGLE } from '../actions/modal-actions';

export default function (state = {
	showModal: false,
	listName: '',
	list: {},
	itemIndex: '',
	itemValue: '',
	mode: 'Edit'
}, action) {

  switch (action.type) {
    case MODAL_CONSTRUCT: {
    	const cloned = _.clone(state);
    	console.log(cloned);
   		cloned.listName = action.payload.listName;
		cloned.list = action.payload.list;
		cloned.showModal = action.payload.showModal;
		cloned.itemIndex = action.payload.itemIndex;
		cloned.itemValue = action.payload.itemValue;
		return cloned;
	}

	case MODAL_TOGGLE: {
		const cloned = _.clone(state);
		cloned.showModal = !state.showModal;
		console.log('toggle', cloned);
		return cloned;
	}

	default:
	}

  return state;
}
