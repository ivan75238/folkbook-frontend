import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import _get from "lodash/get";
import styled from "styled-components";
import {Page} from "components/CommonStyledComponents";
import {get_new_book} from "../../../functions/books";
import {translateStatusBook} from "components/utils";
import Button from "components/Elements/Button";
import moment from "moment";

//region Styled
const Table = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-bottom: 1px solid #cdcdcd;
    padding: 8px 0;
`;

const Column = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-weight: ${props => props.isHeader ? "bold" : ""};
`;

const TableName = styled.p`
    margin-bottom: 4px;
`;
//endregion

@connect(state => ({
    user: _get(state.app, "user"),
    new_books: _get(state.books, "new_books"),
}))
class MainPage extends PureComponent {
    componentDidMount() {
        const {dispatch} = this.props;
        get_new_book(dispatch);
    }

    render() {
        const {new_books} = this.props;
        console.log("new_books", new_books);
        return (
            <Page>
                <TableName>Ближайшие книги</TableName>
                <Table>
                    <Row>
                        <Column isHeader>Название</Column>
                        <Column isHeader>Участники</Column>
                        <Column isHeader>Старт</Column>`
                        <Column isHeader>Жанры</Column>
                        <Column isHeader>Статус</Column>
                        <Column isHeader>Действия</Column>
                    </Row>
                    {
                        new_books.map((book, i) => {
                            return (
                                <Row key={i}>
                                    <Column>{book.name}</Column>
                                    <Column>{`${_get(book, "participants", []).length}/${book.max_participants}`}</Column>
                                    <Column>{moment(book.started_at).format("DD.MM.YYYY HH:mm")}</Column>
                                    <Column>{book.genres.join(",")}</Column>
                                    <Column>{translateStatusBook(book)}</Column>
                                    <Column><Button title={"Записаться"}/></Column>
                                </Row>
                            )
                        })
                    }
                </Table>
            </Page>
        )
    }
}

MainPage.propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
    new_books: PropTypes.array,
};

export default MainPage;
