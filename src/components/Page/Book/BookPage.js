import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {Page} from "components/CommonStyledComponents";
import styled from "styled-components";
import {
    create_draft_section, get_applicants_on_section,
    get_book,
    get_draft_section, get_user_vote_from_section,
    send_applicant, send_vote_result,
    update_draft_section
} from "../../../functions/books";
import _get from "lodash/get";
import WysiwygInput from "components/Elements/WysiwygInput";
import Button from "components/Elements/Button";
import _orderBy from 'lodash/orderBy';
import {translateStatusSection} from "components/utils";
import {StyledCheckbox} from "components/Elements/StyledCheckbox";
import {toast} from "react-toastify";
import CheckedApplicantIcon from "components/Icons/CheckedApplicantIcon";
import Popup from "components/Elements/Popup";
import {booksActions} from "reducers/actions";

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
    margin-top: 4px;
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

const ApplicantsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    padding: 16px;
`;

const ApplicantsWrapper = styled.div`
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`;

const ApplicantVariant = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start; 
    flex-direction: column;
    cursor: pointer;
    position: relative;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    background: rgba(255,255,255, 0.3);
`;

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
};

const generateGradient = () => {
    const gradients = [
        "linear-gradient(90deg, #f598a8, #f6edb2)",
        "linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db)",
        "linear-gradient(90deg, #cfecd0, #ffc5ca)",
        "linear-gradient(90deg, #b9deed, #efefef)",
        "linear-gradient(90deg, #aea4e3, #d3ffe8)",
        "linear-gradient(90deg, #69b7eb, #b3dbd3, #f4d6db)",
        "linear-gradient(90deg, #ee5c87, #f1a4b5, #d587b3)",
        "linear-gradient(85deg, #fb63f9, #c2e534)",
        "linear-gradient(21deg, #dd03e4, #5611ec)",
        "linear-gradient(81deg, #ddb35f, #7409c7)",
        "linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%)",
        "linear-gradient(66deg, #e38010, #1535bf)",
    ];
    return gradients[Math.floor(getRandomArbitrary(1, 12) - 1)];
};

const ApplicantBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    width: 64px;
    height: 64px;
    color: #000;
    font-size: 20px;
    font-weight: bold;
    border-radius: 5px;
    margin-right: 16px;
    margin-bottom: 16px;
    background: ${generateGradient()};
`;

const QuestionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2px; 
    margin-top: 2px;
`;

const OptionsWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 16px;
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
        next_is_last_in_book: false,
        applicants: null,
        selectedApplicantId: null,
        applicantView: null,
        isVoted: false,
        next_is_last_in_chapter_vote: false,
        next_is_last_in_book_vote: false,
        disabled_vote: false
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
        const {open_book, user} = this.props;
        const open_book_old = prevProps.open_book;
        if (open_book && open_book.participants.find(i => i === user.id)) {
            //Проверка на факт участника
            if (!open_book_old && open_book && open_book.status === "in_work") {
                setTimeout(async () => {
                    open_book.last_section = this.getLastSection(open_book);
                    const status = translateStatusSection(open_book);
                    if (status.status === "in_work") {
                        this.getDraftSection(open_book.last_section.id);
                    }
                    if (status.status === "vote") {
                        this.getApplicantsOnSection(open_book.last_section.id);
                        this.getExistUserVote(open_book.last_section.id);
                    }
                }, 100)
            }
            else if (open_book_old && open_book) {
                open_book_old.last_section = this.getLastSection(open_book_old);
                open_book.last_section = this.getLastSection(open_book);
                const statusOld = translateStatusSection(open_book_old);
                const statusNew = translateStatusSection(open_book);
                if (statusOld.status === "in_work" && statusNew.status === "vote") {
                    this.getApplicantsOnSection(open_book.last_section.id);
                    this.getExistUserVote(open_book.last_section.id);
                }
            }
        }
    }

    getApplicantsOnSection = async id_section => {
        const applicants = await get_applicants_on_section(id_section);
        this.setState({applicants});
    };

    getExistUserVote = async id_section => {
        const result = await get_user_vote_from_section(id_section);
        this.setState({isVoted: result.isVoted});
    };

    getDraftSection = async id_section => {
        const draft_section = await get_draft_section(id_section);
        if (draft_section) {
            this.setState({
                draft_section,
                value: draft_section.text,
                next_is_last_in_book: draft_section.next_is_last_in_book,
                next_is_last_in_chapter: draft_section.next_is_last_in_chapter
            })
        }
    };

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
        send_applicant(data)
            .then(async () => {
                toast.success("Ваш вариант отправлен на голосование");
                await get_book(dispatch, this.props.match.params.id);
                await this.getDraftSection(id_section);
                this.setState({disabled: false});
            })
            .catch(async error => {
                if (error.response.data.msg === "vote start") {
                    await get_book(dispatch, this.props.match.params.id);
                }
                this.setState({disabled: false});
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

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({type: booksActions.SET_BOOK, open_book: null});
    }

    sendUserVote = async () => {
        const {selectedApplicantId, next_is_last_in_chapter_vote, next_is_last_in_book_vote} = this.state;
        const {dispatch, open_book} = this.props;
        this.setState({disabled_vote: true});
        const id_section = this.getLastSection(open_book).id;
        const data = {
            id_applicant: selectedApplicantId,
            id_section,
            next_is_last_in_book: next_is_last_in_book_vote,
            next_is_last_in_chapter: next_is_last_in_chapter_vote
        };
        send_vote_result(data)
            .then(async () => {
                toast.success("Ваш голос принят, дождитесь окончания голосования");
                await get_book(dispatch, this.props.match.params.id);
                this.getExistUserVote(id_section);
                this.setState({disabled_vote: false});
            })
            .catch(async error => {
                if (error.response.data.msg === "vote start") {
                    await get_book(dispatch, this.props.match.params.id);
                    this.getExistUserVote(id_section);
                }
                this.setState({disabled_vote: false});
                return toast.error(error.response.data.msgUser);
            });
    };

    generateBookHtml = () => {
        const {open_book} = this.props;
        const chapters = _orderBy(open_book.chapters, i => i.number);
        let bookText = '';
        chapters.map(chapter => {
            chapter.sections = _orderBy(chapter.sections, i => i.number);
            bookText += `<p style="text-align:center;"><span style="font-size: 18px;">Глава ${chapter.number}</span></p>`;
            chapter.sections.map(section => section.text ? bookText += `${section.text}` : "");
        });
        return bookText;
    };

    getLastSection = (open_book) => {
        const chapters = _orderBy(open_book.chapters, i => i.number, "desc");
        chapters[0].sections = _orderBy(chapters[0].sections, i => i.number, "desc");
        return chapters[0].sections[0];
    };

    render() {
        const {error} = this.state;
        const {open_book, user} = this.props;

        if (error)
            return <p>{error}</p>;

        if (!open_book)
            return null;

        const user_is_participant = _get(open_book, "participants",[]).find(i => i === user.id);
        open_book.last_section = this.getLastSection(open_book);
        const status = translateStatusSection(open_book);

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
                    this.renderTextEditor(open_book)
                }
                {
                    user_is_participant &&
                    open_book.status === "in_work" &&
                    status.status === "vote" &&
                    this.renderVote(open_book)
                }
                {this.renderApplicantView()}
            </Page>
        )
    }

    renderTextEditor = (open_book) => {
        const {value, disabled, next_is_last_in_chapter, next_is_last_in_book, draft_section} = this.state;
        const disabledInputs = draft_section ? draft_section.status === "finished" : false;
        return (
            <>
                <WysiwygInput onChange={(value, disabledMax) => this.setState({value, disabled: disabledMax})}
                              value={value}
                              disabled={disabled || disabledInputs}
                              maxLenght={2000}
                              placeholder={"Введите текст секции"}/>
                <ButtonWrapper>
                    <Container>
                        {
                            !open_book.last_section.is_last_in_chapter &&
                            !open_book.last_section.is_last_in_book &&
                            <>
                                <StyledCheckbox label={"Следующая секция последняя в главе"}
                                                value={next_is_last_in_chapter}
                                                disabled={disabled || disabledInputs}
                                                onChange={value => this.setState({next_is_last_in_chapter: value, next_is_last_in_book: false})}/>
                                <StyledCheckbox label={"Следующая секция последняя в книге"}
                                                value={next_is_last_in_book}
                                                disabled={disabled || disabledInputs}
                                                onChange={value => this.setState({next_is_last_in_chapter: false, next_is_last_in_book: value})}/>
                            </>
                        }
                    </Container>
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
        )
    };

    renderVote = (open_book) => {
        const {applicants, selectedApplicantId, isVoted, next_is_last_in_chapter_vote, disabled_vote, next_is_last_in_book_vote} = this.state;
        const {user} = this.props;
        if (isVoted) {
            return <p>Вы уже проголосовали, дождитесь окончания голосования</p>
        }

        if (!applicants) {
            return null;
        }

        if (!applicants.find(i => i.id_user === user.id)){
            return <p>В голосовании учавствуют только предложившие свой вариант пользователи</p>
        }
        const applicantsWithoutAuthUser = applicants.filter(i => i.id_user !== user.id);

        let showQuestionLastInChapter = false, showQuestionLastInBook = false;
        applicants.map(applicant => {
            if (applicant.next_is_last_in_chapter) {
                showQuestionLastInChapter = true;
            }
            if (applicant.next_is_last_in_book) {
                showQuestionLastInBook = true;
            }
        });
        return (
            <ApplicantsContainer>
                <p>Проголосуйте за понравившийся вариант, обращаем ваше внимание что за свой вариант голосовать нельзя, из-за чего он не представлен в списке</p>
                <ApplicantsWrapper>
                    {
                        applicantsWithoutAuthUser.map((applicant, i) => {
                            return (
                                <ApplicantVariant key={i}
                                                  onClick={() => this.setState({applicantView: {applicant, number: i+1}})}>
                                    <ApplicantBox>
                                        {`№${i+1}`}
                                    </ApplicantBox>
                                    {
                                        applicant.id === selectedApplicantId &&
                                        <IconWrapper>
                                            <CheckedApplicantIcon/>
                                        </IconWrapper>
                                    }
                                </ApplicantVariant>
                            )
                        })
                    }
                </ApplicantsWrapper>
                {
                    !open_book.last_section.is_last_in_book &&
                    !open_book.last_section.is_last_in_chapter &&
                    showQuestionLastInChapter &&
                    <QuestionWrapper>
                        <p>Участники предлагают завершить главу следующей секцией, вы согласны?</p>
                        <OptionsWrapper>
                            <StyledCheckbox label={"Согласен"}
                                            value={next_is_last_in_chapter_vote}
                                            disabled={disabled_vote}
                                            onChange={() => this.setState({next_is_last_in_chapter_vote: true})}/>
                            <StyledCheckbox label={"Не согласен"}
                                            value={!next_is_last_in_chapter_vote}
                                            disabled={disabled_vote}
                                            onChange={() => this.setState({next_is_last_in_chapter_vote: false})}/>
                        </OptionsWrapper>
                    </QuestionWrapper>
                }
                {
                    !open_book.last_section.is_last_in_book &&
                    !open_book.last_section.is_last_in_chapter &&
                    showQuestionLastInBook &&
                    <QuestionWrapper>
                        <p>Участники предлагают завершить книгу следующей секцией, вы согласны?</p>
                        <OptionsWrapper>
                            <StyledCheckbox label={"Согласен"}
                                            value={next_is_last_in_book_vote}
                                            disabled={disabled_vote}
                                            onChange={() => this.setState({next_is_last_in_book_vote: true})}/>
                            <StyledCheckbox label={"Не согласен"}
                                            value={!next_is_last_in_book_vote}
                                            disabled={disabled_vote}
                                            onChange={() => this.setState({next_is_last_in_book_vote: false})}/>
                        </OptionsWrapper>
                    </QuestionWrapper>
                }
                {
                    selectedApplicantId &&
                    <ButtonWrapper>
                        <Container/>
                        <Container>
                            <Button title={"Проголосовать"}
                                    height="40px"
                                    onClick={this.sendUserVote}
                                    margin="0 0 0 0"/>
                        </Container>
                    </ButtonWrapper>
                }
            </ApplicantsContainer>
        );
    };

    renderApplicantView = () => {
        const { applicantView } = this.state;
        if (!applicantView)
            return null;

        return (
            <Popup title={`Вариант №${applicantView.number}`}
                   onClose={() => this.setState({applicantView: null})}
                   width={"600px"}
                   buttons={<Button title={"Выбрать этот вариант"}
                                    height={"40px"}
                                    onClick={() => this.setState({
                                        applicantView: null,
                                        selectedApplicantId: applicantView.applicant.id
                                    })}/>}>
                <WysiwygInput value={applicantView.applicant.text}
                              height={"auto"}
                              viewer={true}/>
            </Popup>
        )
    };
}

BookPage.propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.any,
    open_book: PropTypes.object,
    user: PropTypes.object,
};

export default BookPage;
