import moment from "moment";
import _get from "lodash/get";

export const translateStatusBook = book => {
    switch (book.status) {
        case "created":
            return "Поиск авторов";
        case "in_work":
            return "В работе";
        case "finished":
            return "Завершена";
    }
};

export const validateEmail = email =>  {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const translateStatusSection = book => {
    const section_finished_at = moment(_get(book, "last_section.finished_at")).local();
    const section_vote_finished_at = moment(_get(book, "last_section.vote_finished_at")).local();
    let statusSection = "in_work";
    if (moment().isAfter(section_finished_at)) {
        statusSection = "vote";
    }
    switch (statusSection) {
        case "vote":
            return {
                title: "Идет голосование",
                status: "vote",
                timeout: section_vote_finished_at
            };
        case "in_work":
            return {
                title: "В работе",
                status: "in_work",
                timeout: section_finished_at
            };
    }
};