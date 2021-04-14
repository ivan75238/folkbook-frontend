export const translateStatusBook = book => {
    switch (book.status) {
        case "created":
            return "Поиск авторов";
        case "in_work":
            return "В работе";
    }
};

export const validateEmail = email =>  {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};