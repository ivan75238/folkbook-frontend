import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {Page} from "components/CommonStyledComponents";
import styled from "styled-components";
import {get_book} from "../../../functions/books";
import _get from "lodash/get";
import WysiwygInput from "components/Elements/WysiwygInput";
import Button from "components/Elements/Button";
import _orderBy from 'lodash/orderBy';

const BookInfo = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 16px;
`;

const Text = styled.p`
    font-size: 14px; 
    margin-top: 8px;
    color: #000;
    text-align: center;
    
    span {
        font-weight: bold;    
    }
`;

const Title = styled.p`
    font-size: 16px; 
    margin-top: 8px;
    margin-bottom: 16px;
    color: #000;
    text-align: center;
    width: 100%;
    font-weight: bold;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-center;
    justify-content: flex-end;
    margin-top: 16px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: auto;
    margin-bottom: 16px;
`;

@connect(state => ({
    user: _get(state.app, "user"),
    open_book: _get(state.books, "open_book"),
}))
class BookPage extends PureComponent {
    state = {
        error: null,
        id_book: null,
        value: ""
    };

    componentDidMount() {
        const {dispatch} = this.props;
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({id_book: this.props.match.params.id});
            get_book(dispatch, this.props.match.params.id);
        } else {
            this.setState({error: 'Книга не найдена'});
        }
    }

    sendToVote = () => {

    };

    saveDraft = () => {

    };

    createBook = () => {
        const {open_book} = this.props;
        const chapters = _orderBy(open_book.chapters, i => i.number);
        let bookText = '';
        chapters.map(chapter => {
            chapter.sections = _orderBy(chapter.sections, i => i.number);
            bookText += `<p style="text-align:center;"><span style="font-size: 18px;">Глава ${chapter.number}</span></p>`;
            chapter.sections.map(section => bookText += `${section.text}`);
        });
        return bookText;
    };

    render() {
        const {error, value} = this.state;
        const {open_book, user} = this.props;

        if (error)
            return <p>{error}</p>;

        if (!open_book)
            return null;

        const user_is_participant = _get(open_book, "participants",[]).find(i => i === user.id);

        return (
            <Page height={"calc(100vh - 49px)"}>
                <BookInfo>
                    <Text><span>Название: </span>{open_book.name}</Text>
                    <Text><span>Возрастное ограничение: </span>{open_book.age_rating}</Text>
                    <Text><span>Жанры: </span>{open_book.genres.join(", ")}</Text>
                </BookInfo>
                <Title>Содержание</Title>
                <ContentWrapper>
                    <WysiwygInput value={this.createBook()}
                                  viewer={true}/>
                </ContentWrapper>
                {
                    user_is_participant &&
                    <WysiwygInput onChange={value => this.setState({value})}
                                  value={value}
                                  placeholder={"Введите текст секции"}/>
                }
                <ButtonWrapper>
                    <Button title={"Сохранить черновик"}
                            height="40px"
                            onClick={this.saveDraft}
                            margin="0 16px 0 0"/>
                    <Button title={"Отправить на голосование"}
                            height="40px"
                            onClick={this.sendToVote}
                            margin="0 0 0 0"/>
                </ButtonWrapper>
            </Page>
        )
    }
}

BookPage.propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.any,
    open_book: PropTypes.object,
    user: PropTypes.object,
};

export default BookPage;
