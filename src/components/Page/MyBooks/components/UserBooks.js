import React, {PureComponent} from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import PropTypes from "prop-types";
import {Column, Page, Row, Table, TableName} from "components/CommonStyledComponents";
import {translateStatusBook} from "components/utils";
import Paginator from "components/Elements/Paginator";
import _orderBy from 'lodash/orderBy';
import moment from "moment";
import {withRouter} from "react-router-dom";
import {Paths} from "../../../../Paths";
import {get_all_user_books} from "../../../../functions/books";

@withRouter
@connect(state => ({
    all_user_books: _get(state.books, "all_user_books"),
}))
class UserBooks extends PureComponent {
    state = {
        page: 1,
        countOnPage: 10,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        const {page, countOnPage} = this.state;
        get_all_user_books(dispatch, page, countOnPage);
    }

    loadBooks = page => {
        const {dispatch} = this.props;
        const {countOnPage} = this.state;
        this.setState({page});
        get_all_user_books(dispatch, page, countOnPage);
    };

    onClickRow = book => {
        const {history} = this.props;
        history.push(Paths.books.book.path(book.id));
    };

    render() {
        const {all_user_books} = this.props;
        const {page, countOnPage} = this.state;

        console.log("all_user_books", all_user_books);

        if (!all_user_books)
            return null;

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
                           countItems={all_user_books.allCount}
                           onChangeCurrentPage={this.loadBooks}
                           currentPage={page}/>
            </Page>
        )
    }
}

UserBooks.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.func,
    all_user_books: PropTypes.array,
};

export default UserBooks;