import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _get from "lodash/get";
import {Column, Page, Row, Table, TableName} from "components/CommonStyledComponents";
import {get_new_book, join_in_book} from "../../../functions/books";
import {translateStatusBook} from "components/utils";
import Button from "components/Elements/Button";
import moment from "moment";
import Popup from "components/Elements/Popup";

const NewBooks = () => {
    const [disabled, setDisabled] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const user = useSelector(state => _get(state.app, "user"));
    const new_books = useSelector(state => _get(state.books, "new_books"));
    const dispatch = useDispatch();

    useEffect(() => get_new_book(dispatch), []);

    const joinInBook = async () => {
        setDisabled(true);
        await join_in_book(dispatch, showWarning, user.id);
        setDisabled(false);
        setShowWarning(false);
    };

    const renderWarning = () => {
        if (!showWarning) return null;

        return (
            <Popup title={`Предупреждение`}
                   onClose={() => setShowWarning(false)}
                   width={"600px"}
                   listenEscForClose={true}
                   buttons={<Button title={"Продолжить"}
                                    height={"40px"}
                                    onClick={() => joinInBook()}/>}>
                <p>Время начала книги может измениться, если не останется свободных мест для новых участников. В случае изменения даты и времени начала книги, мы пришлем вам письмо на указанный при регистрации адрес электронной почты.</p>
            </Popup>
        )
    };

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
                                                        onClick={() => setShowWarning(book.id)}/>
                                    }
                                </Column>
                            </Row>
                        )
                    })
                }
            </Table>
            {renderWarning()}
        </Page>
    )
};

export default NewBooks;
