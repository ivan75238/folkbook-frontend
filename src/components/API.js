import axios from "axios";
import {URLS} from "config/config";

axios.defaults.withCredentials = true;
axios.defaults.headers = {
    ...axios.defaults.headers,
};


const API = {
    version: "1.0",

    USER: {
        LOGIN(username, password) {
            return axios.post(URLS.USER.LOGIN, {username, password})
        },
        REGISTRATION(username, password) {
            return axios.post(URLS.USER.REGISTRATION, {username, password})
        },
        LOGOUT() {
            return axios.post(URLS.USER.LOGOUT)
        },
        GET_USER() {
            return axios.get(URLS.USER.GET_USER)
        },
        GET_ACTIVE_BOOKS() {
            return axios.get(URLS.USER.GET_ACTIVE_BOOKS)
        },
        JOIN_IN_BOOK(id_book, id_user) {
            return axios.post(URLS.BOOKS.JOIN_IN_BOOK,{id_book, id_user})
        },
    },

    BOOKS: {
        GET_NEW() {
            return axios.get(URLS.BOOKS.GET_NEW)
        },
        GET(id_book) {
            return axios.get(`${URLS.BOOKS.GET}?id_book=${id_book}`)
        },
        GET_DRAFT_SECTION(id_section) {
            return axios.get(`${URLS.BOOKS.GET_DRAFT_SECTION}?id_section=${id_section}`)
        },
        CREATE_DRAFT_SECTION(data) {
            return axios.post(URLS.BOOKS.CREATE_DRAFT_SECTION, data)
        },
        UPDATE_DRAFT_SECTION(data) {
            return axios.post(URLS.BOOKS.UPDATE_DRAFT_SECTION, data)
        },
        SEND_APPLICANT(data) {
            return axios.post(URLS.BOOKS.SEND_APPLICANT, data)
        },
    },
};

export {API}
