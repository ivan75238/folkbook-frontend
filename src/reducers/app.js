import {appActions} from "./actions";

const initial = {
    auth: false,
    user: null,
};

export function app(state = initial, action) {

    switch (action.type) {
        case appActions.SET_AUTH_VALUE: {
            return {
                ...state,
                auth: action.auth
            };
        }

        case appActions.SET_AUTH_DATA: {
            return {
                ...state,
                user: action.user
            };
        }

        default:
            return state;
    }

}
