import React, {PureComponent} from "react";
import {get_all_book_without_not_started} from "../../../functions/books";
import { connect } from "react-redux";
import _get from "lodash/get";
import PropTypes from "prop-types";
import {Column, Page, Row, Table, TableName} from "components/CommonStyledComponents";
import {translateStatusBook} from "components/utils";

@connect(state => ({
    all_books: _get(state.books, "all_books"),
}))
class AllBook extends PureComponent {
    state = {
        page: 1,
        countOnPage: 15,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        get_all_book_without_not_started(dispatch);
    }

    render() {
        const {all_books} = this.props;
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
                        all_books.map((book, i) => {
                            return (
                                <Row key={i}>
                                    <Column>{book.name}</Column>
                                    <Column>{book.genres.join(", ")}</Column>
                                    <Column>{translateStatusBook(book)}</Column>
                                </Row>
                            )
                        })
                    }
                </Table>
            </Page>
        )
    }
}

AllBook.propTypes = {
    dispatch: PropTypes.func,
    all_books: PropTypes.array,
};

export default AllBook;