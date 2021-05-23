import {appActions} from "./actions";

const initial = {
    auth: false,
    user: null,
    loading: false,
};

export function app(state = initial, action: any) {

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

        case appActions.SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            };
        }

        default:
            return state;
    }

}
