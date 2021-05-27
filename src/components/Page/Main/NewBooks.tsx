import React, {useEffect, useState} from "react";
import _get from "lodash/get";
import {Column, Page, Row, Table, TableName} from "../../CommonStyledComponents";
import {get_new_book, join_in_book} from "../../../functions/books";
import {translateStatusBook} from "../../utils";
import Button from "../../Elements/Button";
import moment from "moment";
import Popup from "../../Elements/Popup";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Book, User} from "../../../Types/Types";

const NewBooks = () => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<number>(0);
    const user = useAppSelector<User>(state => state.app.user);
    const new_books = useAppSelector<Book[]>(state => state.books.new_books);
    const dispatch = useAppDispatch();

    useEffect(() => {get_new_book(dispatch)}, []);

    const joinInBook = async () => {
        setDisabled(true);
        await join_in_book(dispatch, showWarning, user.id);
        setDisabled(false);
        setShowWarning(0);
    };

    const renderWarning = () => {
        if (!showWarning) return null;

        return (
            <Popup title={"Предупреждение"}
                   onClose={() => setShowWarning(0)}
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
                    new_books.map((book: Book, i: number) => {
                        const participants: number[] = _get(book, "participants", []);
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
