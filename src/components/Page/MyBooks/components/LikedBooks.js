import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _get from "lodash/get";
import PropTypes from "prop-types";
import {Column, Page, Row, Table, TableName} from "components/CommonStyledComponents";
import {translateStatusBook} from "components/utils";
import Paginator from "components/Elements/Paginator";
import _orderBy from 'lodash/orderBy';
import moment from "moment";
import {useHistory} from "react-router-dom";
import {get_liked_books} from "../../../../functions/liked_books";
import {Paths} from "../../../../Paths";

const LikedBooks = () => {
    const [page, setPage] = useState(1);
    const [countOnPage] = useState(10);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => get_liked_books(dispatch, page, countOnPage), []);

    const loadBooks = newPage => {
        setPage(newPage);
        get_liked_books(dispatch, page, countOnPage);
    };

    const onClickRow = book => history.push(Paths.books.book.path(book.id));

    const liked_books = useSelector(state => _get(state.books, "liked_books"));

    if (!liked_books) return null;

    const books = _orderBy(liked_books.books, i => moment(i.last_section.updated_at).unix(), "desc");

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