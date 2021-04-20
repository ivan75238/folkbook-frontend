import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {Page} from "components/CommonStyledComponents";
import styled from "styled-components";
import {
    create_draft_section,
    get_book,
    get_draft_section,
    send_applicant,
    update_draft_section
} from "../../../functions/books";
import _get from "lodash/get";
import WysiwygInput from "components/Elements/WysiwygInput";
import Button from "components/Elements/Button";
import _orderBy from 'lodash/orderBy';
import {translateStatusSection} from "components/utils";
import {StyledCheckbox} from "components/Elements/StyledCheckbox";
import {toast} from "react-toastify";

const BookInfo = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 16px;
`;

const Column = styled.div`
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
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
    justify-content: space-between;
    margin-top: 16px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: auto;
    margin-bottom: 16px;
`;

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start; 
`;

@connect(state => ({
    user: _get(state.app, "user"),
    open_book: _get(state.books, "open_book"),
}))
class BookPage extends PureComponent {
    state = {
        error: null,
        id_book: null,
        value: "",
        draft_section: null,
        disabled: false,
        next_is_last_in_chapter: false,
        next_is_last_in_book: false
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

    componentDidUpdate(prevProps) {
        const {open_book} = this.props;
        const open_book_old = prevProps;
        if(!open_book_old && open_book && open_book.status === "in_work") {
            setTimeout(async () => {
                open_book.last_section = this.getLastSection(open_book);
                const status = translateStatusSection(open_book);
                if (status.status === "in_work") {
                    const draft_section = await get_draft_section(open_book.last_section.id);
                    if (draft_section) {
                        this.setState({
                            draft_section,
                            value: draft_section.text,
                            next_is_last_in_book: draft_section.next_is_last_in_book,
                            next_is_last_in_chapter: draft_section.next_is_last_in_chapter
                        })
                    }
                }
            }, 100)
        }
        else if (open_book_old && open_book) {
            open_book_old.last_section = this.getLastSection(open_book_old);
            open_book.last_section = this.getLastSection(open_book);
            const statusOld = translateStatusSection(open_book_old);
            const statusNew = translateStatusSection(open_book);
            if (statusOld.status === "in_work" && statusNew.status === "vote") {
                //Изменился статус на "Идет голосование", получаем данные по голосованию

            }
        }
    }

    sendToVote = async () => {
        const {dispatch, open_book} = this.props;
        const {value, next_is_last_in_chapter, next_is_last_in_book} = this.state;
        const id_section = this.getLastSection(open_book).id;
        this.setState({disabled: true});
        const data = {
            id_section,
            text: value,
            next_is_last_in_book,
            next_is_last_in_chapter
        };
        await send_applicant(data)
            .then(async () => {
                toast.success("Ваш вариант отправлен на голосование");
                await get_book(dispatch, this.props.match.params.id);
                this.setState({disabled: false});
            })
            .catch(async error => {
                if (error.response.data.msg === "vote start") {
                    await get_book(dispatch, this.props.match.params.id);
                    this.setState({disabled: false});
                }
                return toast.error(error.response.data.msgUser);
            });
    };

    saveDraft = async () => {
        const {draft_section, value, next_is_last_in_chapter, next_is_last_in_book} = this.state;
        const {dispatch, open_book} = this.props;
        const id_section = this.getLastSection(open_book).id;
        this.setState({disabled: true});
        const data = {
            id_section,
            text: value,
            next_is_last_in_book,
            next_is_last_in_chapter
        };
        //Создаем запись в кандидатах
        if (!draft_section) {
            create_draft_section(data)
                .then(() => {
                    return toast.success("Изменения сохранены");
                })
                .catch(async error => {
                    if (error.response.data.msg === "vote start") {
                        await get_book(dispatch, this.props.match.params.id);
                        this.setState({disabled: false});
                    }
                    return toast.error(error.response.data.msgUser);
                });
        }
        //Обновляем черновик
        else {
            await update_draft_section(data)
                .then(() => {
                    return toast.success("Изменения сохранены");
                })
                .catch(async error => {
                    if (error.response.data.msg === "vote start") {
                        await get_book(dispatch, this.props.match.params.id);
                        this.setState({disabled: false});
                    }
                    return toast.error(error.response.data.msgUser);
                });
        }
        this.setState({disabled: false});
    };

    generateBookHtml = () => {
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

    getLastSection = (open_book) => {
        const chapters = _orderBy(open_book.chapters, i => i.number, "desc");
        chapters[0].sections = _orderBy(chapters[0].sections, i => i.number, "desc");
        return chapters[0].sections[0];
    };

    render() {
        const {error, value, disabled, next_is_last_in_chapter, next_is_last_in_book, draft_section} = this.state;
        const {open_book, user} = this.props;

        if (error)
            return <p>{error}</p>;

        if (!open_book)
            return null;

        const user_is_participant = _get(open_book, "participants",[]).find(i => i === user.id);
        open_book.last_section = this.getLastSection(open_book);
        const status = translateStatusSection(open_book);

        const disabledInputs = draft_section ? draft_section.status === "finished" : false;

        return (
            <Page height={"calc(100vh - 49px)"}>
                <BookInfo>
                    <Column>
                        <Text><span>Название: </span>{open_book.name}</Text>
                        <Text><span>Возрастное ограничение: </span>{open_book.age_rating}</Text>
                        <Text><span>Жанры: </span>{open_book.genres.join(", ")}</Text>
                    </Column>
                    <Column>
                        <Text><span>Статус: </span>{status.title}</Text>
                        <Text><span>Срок: </span>{status.timeout.format("DD.MM.YYYY HH:mm")}</Text>
                    </Column>
                </BookInfo>
                <Title>Содержание</Title>
                <ContentWrapper>
                    <WysiwygInput value={this.generateBookHtml()}
                                  viewer={true}/>
                </ContentWrapper>
                {
                    user_is_participant &&
                    open_book.status === "in_work" &&
                    status.status === "in_work" &&
                    <>
                        <WysiwygInput onChange={(value, disabled) => this.setState({value, disabled})}
                                      value={value}
                                      disabled={disabledInputs}
                                      maxLenght={2000}
                                      placeholder={"Введите текст секции"}/>
                        <ButtonWrapper>
                            {
                                //ToDo: проверка, если в секции проставлены флаги последних признаков, то не показывать это
                                <Container>
                                    <StyledCheckbox label={"Следующая секция последняя в главе"}
                                                    value={next_is_last_in_chapter}
                                                    disabled={disabledInputs}
                                                    onChange={value => this.setState({next_is_last_in_chapter: value})}/>
                                    <StyledCheckbox label={"Следующая секция последняя в книге"}
                                                    value={next_is_last_in_book}
                                                    disabled={disabledInputs}
                                                    onChange={value => this.setState({next_is_last_in_book: value})}/>
                                </Container>
                            }
                            {
                                !disabledInputs &&
                                <Container>
                                    <Button title={"Сохранить черновик"}
                                            height="40px"
                                            onClick={this.saveDraft}
                                            disabled={!value || disabled}
                                            margin="0 16px 0 0"/>
                                    <Button title={"Отправить на голосование"}
                                            height="40px"
                                            disabled={!value || disabled}
                                            onClick={this.sendToVote}
                                            margin="0 0 0 0"/>
                                </Container>
                            }
                        </ButtonWrapper>
                    </>
                }
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
