import _ from 'lodash';
import { MODAL_CONSTRUCT, MODAL_TOGGLE, LOCATION_MODAL_TOGGLE, GENERIC_MODAL_TOGGLE } from '../actions/modal-actions';

export default function (state = {
	showModal: false,
	showLocationModal: false,
	showGenericModal: false,
	listName: '',
	list: {},
	itemIndex: '',
	itemValue: '',
	id:'',
	location: 0,
	name:'',
	description:'',
	shortdescription:'',
	exits:{},
	tests:{},
	actions:{}

}, action) {

  switch (action.type) {
    case MODAL_CONSTRUCT: {
    	//console.log('modal-reducer::construct::action.payload = ', action.payload);
    	const cloned = _.clone(state);

   		cloned.listName = action.payload.listName;
		cloned.list = action.payload.list;
		cloned.showModal = action.payload.showModal;

		cloned.itemIndex = action.payload.itemIndex;
		cloned.itemValue = action.payload.itemValue;
		cloned.id = action.payload.id;
        cloned.location = action.payload.location;
        cloned.name = action.payload.name;
        cloned.visited = action.payload.visited;
        cloned.description = action.payload.description;
        cloned.shortdescription = action.payload.shortdescription;
        cloned.exits = action.payload.exits;
        cloned.tests = action.payload.tests;
        cloned.actions = action.payload.actions;

        //console.log('modal-reducer::construct = ', cloned);
		return cloned;
	}


	case MODAL_TOGGLE: {
		const cloned = _.clone(state);
		cloned.showModal = !state.showModal;
		//console.log('toggle', cloned);
		return cloned;
	}
	case LOCATION_MODAL_TOGGLE: {
		const cloned = _.clone(state);
        cloned.showLocationModal = !state.showLocationModal;
        //console.log('toggle locn', cloned);
        return cloned;
    }

    case GENERIC_MODAL_TOGGLE: {
		const cloned = _.clone(state);
        cloned.showGenericModal = !state.showGenericModal;
        //console.log('toggle generic', cloned);
        return cloned;
    }

      default:
	}

  return state;
}
