import {booksActions} from "./actions";

const initial = {
    new_books: [],
    active_books: [],
    all_books: null,
    liked_books: null,
    open_book: null,
    all_user_books: null,
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

        case booksActions.SET_ALL_USER_BOOKS: {
            return {
                ...state,
                all_user_books: action.all_user_books
            };
        }

        case booksActions.SET_ALL_BOOKS: {
            return {
                ...state,
                all_books: action.all_books
            };
        }

        case booksActions.SET_LIKED_BOOKS: {
            return {
                ...state,
                liked_books: action.liked_books
            };
        }

        default:
            return state;
    }

}
