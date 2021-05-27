import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Column, Page, Row, Table, TableName} from "../../../CommonStyledComponents";
import {translateStatusBook} from "../../../utils";
import Paginator from "../../../Elements/Paginator";
import _orderBy from 'lodash/orderBy';
import moment from "moment";
import {useHistory} from "react-router-dom";
import {get_liked_books} from "../../../../functions/liked_books";
import {Paths} from "../../../../Paths";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {Book, PaginationBook} from "../../../../Types/Types";

const LikedBooks = () => {
    const [page, setPage] = useState<number>(1);
    const [countOnPage] = useState<number>(10);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const liked_books = useAppSelector<PaginationBook>(state => state.books.liked_books);

    useEffect(() => get_liked_books(dispatch, page, countOnPage), []);

    const loadBooks = (newPage: number) => {
        setPage(newPage);
        get_liked_books(dispatch, page, countOnPage);
    };

    const onClickRow = (book: Book) => history.push(Paths.books.book.path(book.id));

    if (!liked_books) return null;

    const books = _orderBy(liked_books.books, i => i.last_section ? moment(i.last_section.updated_at).unix() : 0, "desc");

    return (
        <Page>
            <TableName>Понравившиеся книги</TableName>
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
                       countItems={liked_books.allCount}
                       onChangeCurrentPage={loadBooks}
                       currentPage={page}/>
        </Page>
    )
};

LikedBooks.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.func,
    liked_books: PropTypes.array,
};

export default LikedBooks;