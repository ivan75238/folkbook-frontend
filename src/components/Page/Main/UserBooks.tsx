import React, {useEffect} from "react";
import _get from "lodash/get";
import {Column, Page, Row, Table, TableName} from "../../CommonStyledComponents";
import {get_active_books} from "../../../functions/books";
import {Paths} from "../../../Paths";
import {translateStatusSection} from "../../utils";
import _orderBy from 'lodash/orderBy';
import { useHistory } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Book, BookStatus} from "../../../Types/Types";

const UserBooks = () => {
    const active_books = useAppSelector<Book[]>(state => _get(state.books, "active_books", []));
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => get_active_books(dispatch), []);
    const openBook = (book: Book) => history.push(Paths.books.book.path(book.id));

    const active_books_ordered = _orderBy(active_books, book => {
        const status: BookStatus = translateStatusSection(book);
        return status.timeout.unix();
    });

    return (
        <Page>
            <TableName>Мои книги в работе</TableName>
            <Table>
                <Row>
                    <Column isHeader>Название</Column>
                    <Column isHeader>Участники</Column>
                    <Column isHeader>Жанры</Column>
                    <Column isHeader>Текущая секция</Column>
                    <Column isHeader>Статус</Column>
                    <Column isHeader>Срок</Column>
                </Row>
                {
                    active_books_ordered.map((book, i) => {
                        const participants = _get(book, "participants", []);
                        const status = translateStatusSection(book);
                        return (
                            <Row key={i}
                                 onClick={() => openBook(book)}
                                 isCursorPointer>
                                <Column>{book.name}</Column>
                                <Column>{`${participants.length}/${book.max_participants}`}</Column>
                                <Column>{book.genres.join(", ")}</Column>
                                <Column>{_get(book, "last_section.number")}</Column>
                                <Column>{status.title}</Column>
                                <Column>{status.timeout.format("DD.MM.YYYY HH:mm")}</Column>
                            </Row>
                        )
                    })
                }
            </Table>
        </Page>
    )
};

export default UserBooks;
