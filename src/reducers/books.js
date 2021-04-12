import {booksActions} from "./actions";

const initial = {
    new_books: []
};

export function books(state = initial, action) {

    switch (action.type) {
        case booksActions.SET_NEW_BOOKS: {
            return {
                ...state,
                new_books: action.new_books
            };
        }

        default:
            return state;
    }

}
