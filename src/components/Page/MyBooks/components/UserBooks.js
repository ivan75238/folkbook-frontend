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
import {Paths} from "../../../../Paths";
import {get_all_user_books} from "../../../../functions/books";


const UserBooks = () => {
    const [page, setPage] = useState(1);
    const [countOnPage] = useState(10);
    const dispatch = useDispatch();
    let history = useHistory();

    const all_user_books = useSelector(state => _get(state.books, "all_user_books"));

    useEffect(() => get_all_user_books(dispatch, page, countOnPage), []);

    const loadBooks = newPage => {
        setPage(newPage);
        get_all_user_books(dispatch, page, countOnPage);
    };

    const onClickRow = book => history.push(Paths.books.book.path(book.id));

    if (!all_user_books) return null;

    const books = _orderBy(all_user_books.books, i => moment(i.last_section.updated_at).unix(), "desc");

    return (
        <Page>
            <TableName>Мои книги</TableName>
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
                       countItems={all_user_books.allCount}
                       onChangeCurrentPage={loadBooks}
                       currentPage={page}/>
        </Page>
    )
};

UserBooks.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.func,
    all_user_books: PropTypes.array,
};

export default UserBooks;