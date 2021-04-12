const apiUrl = "http://127.0.0.1:9000/";

export const URLS = {
    USER: {
        LOGIN: apiUrl + "user/login",
        LOGOUT: apiUrl + "user/logout",
        GET_USER: apiUrl + "user/",
    },
    BOOKS: {
        GET_NEW: apiUrl + "books/get_new"
    }
};