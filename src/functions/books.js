import {API} from "components/API";
import {booksActions} from "reducers/actions";
import {toast} from "react-toastify";

export const get_new_book = async dispatch => {
    await API.BOOKS.GET_NEW()
        .then(response => {
            dispatch({type: booksActions.SET_NEW_BOOKS, new_books: response.data});
        });
};

export const get_book = async (dispatch, id_book) => {
    await API.BOOKS.GET(id_book)
        .then(response => {
            dispatch({type: booksActions.SET_BOOK, open_book: response.data});
        });
};

export const create_draft_section = (data) => {
    return API.BOOKS.CREATE_DRAFT_SECTION(data);
};

export const send_applicant = data => API.BOOKS.SEND_APPLICANT(data);

export const send_vote_result = data => API.BOOKS.SEND_VOTE_RESULT(data);

export const update_draft_section = (data) => {
    return API.BOOKS.UPDATE_DRAFT_SECTION(data);
};

export const get_draft_section = async (id_section) => {
    return await API.BOOKS.GET_DRAFT_SECTION(id_section)
        .then(response => {
            return response.data;
        });
};

export const get_applicants_on_section = async (id_section) => {
    return await API.BOOKS.GET_APPLICANTS_ON_SECTION(id_section)
        .then(response => {
            return response.data;
        });
};

export const get_user_vote_from_section = async (id_section) => {
    return await API.BOOKS.GET_USER_VOTE_FROM_SECTION(id_section)
        .then(response => {
            return response.data;
        });
};

export const get_active_books = dispatch => {
    API.USER.GET_ACTIVE_BOOKS()
        .then(response => {
            dispatch({type: booksActions.SET_ACTIVE_BOOKS, active_books: response.data});
        });
};

export const get_all_book_without_not_started = (dispatch, page, countOnPage) => {
    API.BOOKS.GET_ALL_BOOK_WITHOUT_NOT_STARTED(page, countOnPage)
        .then(response => {
            dispatch({type: booksActions.SET_ALL_BOOKS, all_books: response.data});
        });
};

export const join_in_book = async (dispatch, id_book, id_user) => {
    await API.USER.JOIN_IN_BOOK(id_book, id_user)
        .then(async () => {
            toast.success("Вы успешно записались, ожидайте старта");
            await get_new_book(dispatch);
        })
        .catch(async error => {
            toast.error(error.response.data.msgUser);
            await get_new_book(dispatch);
        })
};