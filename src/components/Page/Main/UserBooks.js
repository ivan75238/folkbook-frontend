import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import _get from "lodash/get";
import {Column, Page, Row, Table, TableName} from "components/CommonStyledComponents";
import {get_active_books} from "../../../functions/books";
import {translateStatusBook} from "components/utils";
import moment from "moment";

@connect(state => ({
    user: _get(state.app, "user"),
    active_books: _get(state.books, "active_books"),
}))
class UserBooks extends PureComponent {
    componentDidMount() {
        const {dispatch} = this.props;
        get_active_books(dispatch);
    }

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
                            const section_finished_at = moment(_get(book, "last_section.finished_at"));
                            const section_vote_finished_at = moment(_get(book, "last_section.vote_finished_at"));
                            let statusSection = "В роботе", timeout = section_finished_at.format("DD.MM.YYYY HH:mm");
                            if (moment().isAfter(section_finished_at)) {
                                statusSection = "Идет голосование";
                                timeout = section_vote_finished_at.format("DD.MM.YYYY HH:mm");
                            }
                            return (
                                <Row key={i}
                                     isCursorPointer>
                                    <Column>{book.name}</Column>
                                    <Column>{`${participants.length}/${book.max_participants}`}</Column>
                                    <Column>{book.genres.join(", ")}</Column>
                                    <Column>{_get(book, "last_section.number")}</Column>
                                    <Column>{statusSection}</Column>
                                    <Column>{timeout}</Column>
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
    user: PropTypes.object,
    active_books: PropTypes.array,
};

export default UserBooks;
