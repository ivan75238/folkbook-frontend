import React, {PureComponent} from "react";
import {get_all_book_without_not_started} from "../../../functions/books";
import { connect } from "react-redux";
import _get from "lodash/get";
import PropTypes from "prop-types";
import {Column, Page, Row, Table, TableName} from "components/CommonStyledComponents";
import {translateStatusBook} from "components/utils";
import Paginator from "components/Elements/Paginator";
import _orderBy from 'lodash/orderBy';
import moment from "moment";
import {withRouter} from "react-router-dom";
import {Paths} from "../../../Paths";

@withRouter
@connect(state => ({
    all_books: _get(state.books, "all_books"),
}))
class AllBook extends PureComponent {
    state = {
        page: 1,
        countOnPage: 20,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        const {page, countOnPage} = this.state;
        get_all_book_without_not_started(dispatch, page, countOnPage);
    }

    loadBooks = page => {
        const {dispatch} = this.props;
        const {countOnPage} = this.state;
        this.setState({page});
        get_all_book_without_not_started(dispatch, page, countOnPage);
    };

    onClickRow = book => {
        const {history} = this.props;
        history.push(Paths.books.book.path(book.id));
    };

    render() {
        const {all_books} = this.props;
        const {page, countOnPage} = this.state;

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
                                     onClick={() => this.onClickRow(book)}>
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
                           onChangeCurrentPage={this.loadBooks}
                           currentPage={page}/>
            </Page>
        )
    }
}

AllBook.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.func,
    all_books: PropTypes.array,
};

export default AllBook;