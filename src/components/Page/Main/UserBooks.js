import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import _get from "lodash/get";
import {Column, Page, Row, Table, TableName} from "components/CommonStyledComponents";
import {get_active_books} from "../../../functions/books";
import {Paths} from "../../../Paths";
import {translateStatusSection} from "components/utils";

@connect(state => ({
    user: _get(state.app, "user"),
    active_books: _get(state.books, "active_books"),
}))
class UserBooks extends PureComponent {
    componentDidMount() {
        const {dispatch} = this.props;
        get_active_books(dispatch);
    }

    openBook = book => {
        const {history} = this.props;
        history.push(Paths.books.book.path(book.id));
    };

    render() {
        const {active_books} = this.props;
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
                        active_books.map((book, i) => {
                            const participants = _get(book, "participants", []);
                            const status = translateStatusSection(book);
                            return (
                                <Row key={i}
                                     onClick={() => this.openBook(book)}
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
    }
}

UserBooks.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.func,
    user: PropTypes.object,
    active_books: PropTypes.array,
};

export default UserBooks;
