import {Moment} from "moment";

export type User = {
    id: number,
    is_active: number,
    username: string,
    created_at: string,
    nickname: string
}

export type Book = {
    id: number,
    name: string,
    age_rating: number,
    max_participants: number,
    started_at: string,
    status: string,
    chapter_count: number,
    genres: string[],
    participants?: number[],
    chapters?: Chapter[],
    last_section?: Section[],
    last_chapter_number? : number,
    last_chapter_id? : number,
}

export type BookStatus = {
    title: string,
    status: string,
    timeout: Moment
};

export type Chapter = {
    id: number,
    number: number,
    sections: Section[]
}

type PrototypeSection = {
    id: number,
    text: string | null,
    created_at: string,
    updated_at: string,
    is_last_in_chapter: number,
    is_last_in_book: number
}

export type Section = PrototypeSection & {
    id_chapter: number,
    number: number,
    id_author: number,
    finished_at: string,
    vote_finished_at: string,
}

export type Applicant = PrototypeSection & PrototypeSendBook & {
    id_section: number,
    id_user: number,
    status: string
}

export type LoginRequestType = {
    username: string,
    first_name: string,
    email?: string,
    last_name: string,
    href?: string,
    secret: string,
    status?: string,
    expire: string,
    password: string
}

export type PrototypeSendBook = {
    id_section: number,
    next_is_last_in_book: number,
    next_is_last_in_chapter: number
}

export type DraftSectionType = PrototypeSendBook & {
    text: string,
}

export type SendVoteResultType = PrototypeSendBook &{
    id_applicant: number,
}