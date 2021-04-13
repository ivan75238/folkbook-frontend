export const translateStatusBook = book => {
    switch (book.status) {
        case "created":
            return "Поиск авторов";
        case "in_work":
            return "В работе";
    }
};