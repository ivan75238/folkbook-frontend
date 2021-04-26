import {API} from "components/API";
import {get_book} from "./books";

export const create_like = async (dispatch, id_book) => {
    return API.LIKED_BOOKS.CREATE_LIKE(id_book)
        .then(() => get_book(dispatch, id_book));
};

export const remove_like = async (dispatch, id_book) => {
    return API.LIKED_BOOKS.REMOVE_LIKE(id_book)
        .then(() => get_book(dispatch, id_book));
};