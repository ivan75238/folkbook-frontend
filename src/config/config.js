const apiUrlProd = "https://api.folkbook.ru/";
const apiUrlDev = "http://127.0.0.1:19180/";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const apiUrl = process.env.NODE_ENV !== 'production' ? apiUrlDev : apiUrlProd;

export const URLS = {
    USER: {
        LOGIN: apiUrl + "user/login",
        LOGOUT: apiUrl + "user/logout",
        GET_USER: apiUrl + "user/",
        GET_ACTIVE_BOOKS: apiUrl + "user/get_active_books",
    },
    BOOKS: {
        GET_NEW: apiUrl + "books/get_new",
        JOIN_IN_BOOK: apiUrl + "books/join_in_book",
    }
};