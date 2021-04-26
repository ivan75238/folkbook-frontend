import {API} from "components/API";
import {get_book} from "./books";
import {appActions, booksActions} from "reducers/actions";

export const create_like = async (dispatch, id_book) => {
    return API.LIKED_BOOKS.CREATE_LIKE(id_book)
        .then(() => get_book(dispatch, id_book));
};

export const remove_like = async (dispatch, id_book) => {
    return API.LIKED_BOOKS.REMOVE_LIKE(id_book)
        .then(() => get_book(dispatch, id_book));
};

export const get_liked_books = (dispatch, page, countOnPage) => {
    dispatch({type: appActions.SET_LOADING, loading: true});
    API.LIKED_BOOKS.GET_LIKED_BOOKS(page, countOnPage)
        .then(response => {
            dispatch({type: booksActions.SET_LIKED_BOOKS, liked_books: response.data});
            dispatch({type: appActions.SET_LOADING, loading: false});
        });
};