// @ts-ignore
import keyMirror from 'fbjs/lib/keyMirror';

//Ключи для глобального хранилища

export const appActions = keyMirror({
    SET_AUTH_VALUE: undefined,
    SET_AUTH_DATA: undefined,
    SET_LOADING: undefined,
});


export const booksActions = keyMirror({
    SET_NEW_BOOKS: undefined,
    SET_ACTIVE_BOOKS: undefined,
    SET_BOOK: undefined,
    SET_ALL_BOOKS: undefined,
    SET_LIKED_BOOKS: undefined,
    SET_ALL_USER_BOOKS: undefined,
});
