import {combineReducers} from "redux";
function add(state = [], action) {
	switch (action.type) {
		case "add1":
		return state.concat([1,2]);
		case "add2":
		return state.concat([3,4]);
		default:
		return state;
	}
}

function sub(state = [], action) {
	switch (action.type) {
		case "sub1":
		return state;
		case "sub2":
		return state;
		default:
		return state;
	}
}
export default combineReducers({
	add,
	sub
});
