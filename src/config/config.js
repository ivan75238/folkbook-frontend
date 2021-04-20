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
        CREATE_DRAFT_SECTION: apiUrl + "books/create_draft_section",
        UPDATE_DRAFT_SECTION: apiUrl + "books/update_draft_section",
        SEND_APPLICANT: apiUrl + "books/send_applicant",
        JOIN_IN_BOOK: apiUrl + "books/join_in_book",
    }
};