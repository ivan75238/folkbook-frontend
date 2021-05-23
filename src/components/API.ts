import axios, {AxiosResponse} from "axios";
import {URLS} from "../config/config";

axios.defaults.withCredentials = true;
axios.defaults.headers = {
    ...axios.defaults.headers,
};

interface LoginRequestType {
    username: string,
    first_name: string,
    last_name: string,
    href: string,
    secret: string,
    status: string,
    expire: string,
    password: string
}

interface PrototypeSendBook {
    id_section: number,
    next_is_last_in_book: number,
    next_is_last_in_chapter: number
}

interface DraftSectionType extends PrototypeSendBook{
    text: string,
}

interface SendVoteResultType extends  PrototypeSendBook{
    id_applicant: number,
}

const API = {
    version: "1.0",

    USER: {
        LOGIN(username: string, password: string): Promise<AxiosResponse>  {
            return axios.post(URLS.USER.LOGIN, {username, password})
        },
        LOGIN_VK(data: LoginRequestType): Promise<AxiosResponse> {
            return axios.post(URLS.USER.LOGIN_VK, data)
        },
        LOGIN_GOOGLE(data: LoginRequestType): Promise<AxiosResponse> {
            return axios.post(URLS.USER.LOGIN_GOOGLE, data)
        },
        REGISTRATION(username: string, password: string): Promise<AxiosResponse>  {
            return axios.post(URLS.USER.REGISTRATION, {username, password})
        },
        REGISTRATION_VK(data: LoginRequestType): Promise<AxiosResponse>  {
            return axios.post(URLS.USER.REGISTRATION_VK, data)
        },
        REGISTRATION_GOOGLE(data: LoginRequestType): Promise<AxiosResponse>  {
            return axios.post(URLS.USER.REGISTRATION_GOOGLE, data)
        },
        LOGOUT(): Promise<AxiosResponse>  {
            return axios.post(URLS.USER.LOGOUT)
        },
        GET_USER(): Promise<AxiosResponse>  {
            return axios.get(URLS.USER.GET_USER)
        },
        GET_ACTIVE_BOOKS(): Promise<AxiosResponse>  {
            return axios.get(URLS.USER.GET_ACTIVE_BOOKS)
        },
        GET_ALL_USER_BOOKS(page: number, countOnPage: number): Promise<AxiosResponse>  {
            return axios.get(`${URLS.USER.GET_ALL_USER_BOOKS}?page=${page}&count_on_page=${countOnPage}`)
        },
        JOIN_IN_BOOK(id_book: number, id_user: number): Promise<AxiosResponse>  {
            return axios.post(URLS.BOOKS.JOIN_IN_BOOK,{id_book, id_user})
        },
    },

    BOOKS: {
        GET_NEW(): Promise<AxiosResponse>  {
            return axios.get(URLS.BOOKS.GET_NEW)
        },
        GET_ALL_BOOK_WITHOUT_NOT_STARTED(page: number, countOnPage: number): Promise<AxiosResponse>  {
            return axios.get(`${URLS.BOOKS.GET_ALL_BOOK_WITHOUT_NOT_STARTED}?page=${page}&count_on_page=${countOnPage}`)
        },
        GET(id_book: number): Promise<AxiosResponse>  {
            return axios.get(`${URLS.BOOKS.GET}?id_book=${id_book}`)
        },
        GET_DRAFT_SECTION(id_section: number): Promise<AxiosResponse>  {
            return axios.get(`${URLS.BOOKS.GET_DRAFT_SECTION}?id_section=${id_section}`)
        },
        GET_APPLICANTS_ON_SECTION(id_section: number): Promise<AxiosResponse>  {
            return axios.get(`${URLS.BOOKS.GET_APPLICANTS_ON_SECTION}?id_section=${id_section}`)
        },
        GET_USER_VOTE_FROM_SECTION(id_section: number): Promise<AxiosResponse>  {
            return axios.get(`${URLS.BOOKS.GET_USER_VOTE_FROM_SECTION}?id_section=${id_section}`)
        },
        CREATE_DRAFT_SECTION(data: DraftSectionType): Promise<AxiosResponse>  {
            return axios.post(URLS.BOOKS.CREATE_DRAFT_SECTION, data)
        },
        UPDATE_DRAFT_SECTION(data: DraftSectionType): Promise<AxiosResponse>  {
            return axios.post(URLS.BOOKS.UPDATE_DRAFT_SECTION, data)
        },
        SEND_APPLICANT(data: DraftSectionType): Promise<AxiosResponse>  {
            return axios.post(URLS.BOOKS.SEND_APPLICANT, data)
        },
        SEND_VOTE_RESULT(data: SendVoteResultType): Promise<AxiosResponse>  {
            return axios.post(URLS.BOOKS.SEND_VOTE_RESULT, data)
        },
    },
    LIKED_BOOKS: {
        CREATE_LIKE(id_book: number) {
            return axios.post(URLS.LIKED_BOOKS.CREATE_LIKE, {id_book})
        },
        REMOVE_LIKE(id_book: number) {
            return axios.post(URLS.LIKED_BOOKS.REMOVE_LIKE, {id_book})
        },
        GET_LIKED_BOOKS(page: number, countOnPage: number) {
            return axios.get(`${URLS.LIKED_BOOKS.GET_LIKED_BOOKS}?page=${page}&count_on_page=${countOnPage}`)
        },
    }
};

export {API}
