import {API} from "components/API";
import {booksActions} from "reducers/actions";

export const get_new_book = dispatch => {
    API.BOOKS.GET_NEW()
        .then(response => {
            dispatch({type: booksActions.SET_NEW_BOOKS, new_books: response.data});
        });
};