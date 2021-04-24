import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _get from "lodash/get";
import {Column, Page, Row, Table, TableName} from "components/CommonStyledComponents";
import {get_new_book, join_in_book} from "../../../functions/books";
import {translateStatusBook} from "components/utils";
import Button from "components/Elements/Button";
import moment from "moment";
import Popup from "components/Elements/Popup";

@connect(state => ({
    user: _get(state.app, "user"),
    new_books: _get(state.books, "new_books"),
}))
class NewBooks extends PureComponent {
    state = {
        disabled: false,
        showWarning: false
    };

    componentDidMount() {
        const {dispatch} = this.props;
        get_new_book(dispatch);
    }


    joinInBook = async (id_book) => {
        const { dispatch, user } = this.props;
        this.setState({disabled: true});
        await join_in_book(dispatch, id_book, user.id);
        this.setState({disabled: false, showWarning: false});
    };

    render() {
        const {new_books, user} = this.props;
        const {disabled} = this.state;
        return (
            <Page>
                <TableName>Ближайшие книги</TableName>
                <Table>
                    <Row>
                        <Column isHeader>Название</Column>
                        <Column isHeader>Участники</Column>
                        <Column isHeader>Старт</Column>
                        <Column isHeader>Жанры</Column>
                        <Column isHeader>Статус</Column>
                        <Column isHeader>Действия</Column>
                    </Row>
                    {
                        new_books.map((book, i) => {
                            const participants = _get(book, "participants", []);
                            return (
                                <Row key={i}>
                                    <Column>{book.name}</Column>
                                    <Column>{`${participants.length}/${book.max_participants}`}</Column>
                                    <Column>{moment(book.started_at).format("DD.MM.YYYY HH:mm")}</Column>
                                    <Column>{book.genres.join(", ")}</Column>
                                    <Column>{translateStatusBook(book)}</Column>
                                    <Column>
                                        {
                                            participants.indexOf(user.id) > -1 ?
                                                "Вы участник"
                                                :
                                                participants.length === book.max_participants ?
                                                    "Заполнена"
                                                :
                                                    <Button title={"Записаться"}
                                                            disabled={disabled}
                                                            onClick={() => this.setState({showWarning: book.id})}/>
                                        }
                                    </Column>
                                </Row>
                            )
                        })
                    }
                </Table>
                {this.renderWarning()}
            </Page>
        )
    }

    renderWarning = () => {
        const { showWarning } = this.state;
        if (!showWarning)
            return null;

        return (
            <Popup title={`Предупреждение`}
                   onClose={() => this.setState({showWarning: false})}
                   width={"600px"}
                   listenEscForClose={true}
                   buttons={<Button title={"Продолжить"}
                                    height={"40px"}
                                    onClick={() => this.joinInBook(showWarning)}/>}>
                <p>Время начала книги может измениться, если не останется свободных мест для новых участников. В случае изменения даты и времени начала книги, мы пришлем вам письмо на указанный при регистрации адрес электронной почты.</p>
            </Popup>
        )
    };
}

NewBooks.propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
    new_books: PropTypes.array,
};

export default NewBooks;
