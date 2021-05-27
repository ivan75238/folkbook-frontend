import React, {useEffect, useState} from "react";
import {get_all_book_without_not_started} from "../../../functions/books";
import _get from "lodash/get";
import {Column, Page, Row, Table, TableName} from "../../CommonStyledComponents";
import {translateStatusBook} from "../../utils";
import Paginator from "../../Elements/Paginator";
import _orderBy from 'lodash/orderBy';
import moment from "moment";
import {Paths} from "../../../Paths";
import { useHistory } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Book} from "../../../Types/Types";

export const AllBook = () => {
    const [page, setPage] = useState<number>(1);
    const [countOnPage] = useState<number>(20);
    const all_books = useAppSelector(state => _get(state.books, "all_books", {}));
    const history = useHistory();
    const dispatch = useAppDispatch();

    useEffect(() => {
        get_all_book_without_not_started(dispatch, page, countOnPage);
    }, []);

    const onClickRow = (book: Book) => history.push(Paths.books.book.path(book.id));

    const loadBooks = (page: number) => {
        setPage(page);
        get_all_book_without_not_started(dispatch, page, countOnPage);
    };

    if (!all_books)
        return null;

    const books = _orderBy(all_books.books, i => moment(i.last_section.updated_at).unix(), "desc");

    return (
        <Page>
            <TableName>Все книги</TableName>
            <Table>
                <Row>
                    <Column isHeader>Название</Column>
                    <Column isHeader>Жанры</Column>
                    <Column isHeader>Статус</Column>
                </Row>
                {
                    books.map((book, i) => {
                        return (
                            <Row key={i}
                                 isCursorPointer
                                 onClick={() => onClickRow(book)}>
                                <Column>{book.name}</Column>
                                <Column>{book.genres.join(", ")}</Column>
                                <Column>{translateStatusBook(book)}</Column>
                            </Row>
                        )
                    })
                }
            </Table>
            <Paginator countOnPage={countOnPage}
                       countItems={all_books.allCount}
                       onChangeCurrentPage={loadBooks}
                       currentPage={page}/>
        </Page>
    )
};
