/**
 * @author Di Wang
 */
const MENU_COLLAPSED = 'MENU_COLLAPSED';

const initialState = {
	menuCollapsed: false,
};

export default function event(state = initialState, action) {
	switch (action.type) {
		case MENU_COLLAPSED:
			return {
				...state,
				menuCollapsed: action.value
			};

		default:
			return state;
	}
}

export function setMenuCollapsed(value) {
	return {
		value,
		type: MENU_COLLAPSED
	};
}
