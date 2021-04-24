const apiUrlProd = "https://api.folkbook.ru/";
const apiUrlDev = "http://127.0.0.1:19180/";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const apiUrl = process.env.NODE_ENV !== 'production' ? apiUrlDev : apiUrlProd;

export const URLS = {
    USER: {
        LOGIN: apiUrl + "user/login",
        LOGOUT: apiUrl + "user/logout",
        REGISTRATION: apiUrl + "user/registration",
        GET_USER: apiUrl + "user/",
        GET_ACTIVE_BOOKS: apiUrl + "user/get_active_books",
    },
    BOOKS: {
        GET_NEW: apiUrl + "books/get_new",
        GET: apiUrl + "books/get",
        GET_DRAFT_SECTION: apiUrl + "books/get_draft_section",
        GET_APPLICANTS_ON_SECTION: apiUrl + "books/get_applicants_on_section",
        GET_USER_VOTE_FROM_SECTION: apiUrl + "books/get_user_vote_from_section",
        CREATE_DRAFT_SECTION: apiUrl + "books/create_draft_section",
        UPDATE_DRAFT_SECTION: apiUrl + "books/update_draft_section",
        SEND_APPLICANT: apiUrl + "books/send_applicant",
        SEND_VOTE_RESULT: apiUrl + "books/send_vote_result",
        JOIN_IN_BOOK: apiUrl + "books/join_in_book",
        GET_ALL_BOOK_WITHOUT_NOT_STARTED: apiUrl + "books/get_all_book_without_not_started",
    }
};