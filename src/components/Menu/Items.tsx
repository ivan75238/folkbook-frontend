import {Paths} from "../../Paths";

export const Items = [
    {
        id: 0,
        title: "Главная",
        path: Paths.main.list.path()
    },
    {
        id: 1,
        title: "Все книги",
        path: Paths.books.all.path()
    },
    {
        id: 2,
        title: "Мои книги",
        path: Paths.liked_books.list.path()
    },
    {
        id: 101,
        title: "Настройки",
        path: Paths.settings.path()
    },
];