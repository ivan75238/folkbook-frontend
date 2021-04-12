import keyMirror from 'fbjs/lib/keyMirror';

//Ключи для глобального хранилища

export const appActions = keyMirror({
    SET_AUTH_VALUE: undefined,
    SET_AUTH_DATA: undefined,
});


export const booksActions = keyMirror({
    SET_NEW_BOOKS: undefined,
});
