import {booksActions} from "./actions";

const initial = {
    new_books: [],
    active_books: [],
    open_book: null,
};

export function books(state = initial, action) {

    switch (action.type) {
        case booksActions.SET_NEW_BOOKS: {
            return {
                ...state,
                new_books: action.new_books
            };
        }
        case booksActions.SET_BOOK: {
            return {
                ...state,
                open_book: action.open_book
            };
        }
        case booksActions.SET_ACTIVE_BOOKS: {
            return {
                ...state,
                active_books: action.active_books
            };
        }

        default:
            return state;
    }

}
