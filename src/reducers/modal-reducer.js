import _ from 'lodash';
import { MODAL_CONSTRUCTED, MODAL_ACTIVATED } from '../actions/modal-actions';

export default function (state = {
	activate: false,
	content: null,
	customStyle: null,
	canvasOnClick: true
}, action) {
  switch (action.type) {
    case MODAL_CONSTRUCTED: {
			const { activate, content, customStyle, canvasOnClick } = action.payload;
			return {
				activate,
				content,
				customStyle,
				canvasOnClick
			};
		}

		case MODAL_ACTIVATED: {
			const cloned = _.clone(state);
			cloned.activate = action.bool;

			return cloned;
		}

		default:
	}

  return state;
}
