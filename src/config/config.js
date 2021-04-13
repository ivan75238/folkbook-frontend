const apiUrl = "http://folkbook.ru:19180/";

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