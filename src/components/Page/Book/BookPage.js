import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
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
import Heart from "components/Icons/Heart";
import {create_like, remove_like} from "../../../functions/liked_books";

//region Styled
const BookInfo = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 16px;
    position: relative;
`;

const LikedIconWrapper = styled.div`
    height: 24px;
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    display: flex;
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

const CountLikesText = styled.p`
    font-weight: bold;
    font-size: 20px; 
    margin-right: 8px;
    color: #000;
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
//endregion

const getLastSection = open_book => {
    const chapters = _orderBy(open_book.chapters, i => i.number, "desc");
    chapters[0].sections = _orderBy(chapters[0].sections, i => i.number, "desc");
    return chapters[0].sections[0];
};

export const BookPage = ({match}) => {
    const [error, setError] = useState();
    const [value, setValue] = useState("");
    const [draftSection, setDraftSection] = useState();
    const [disabled, setDisabled] = useState();
    const [nextIsLastInChapter, setNextIsLastInChapter] = useState();
    const [nextIsLastInBook, setNextIsLastInBook] = useState();
    const [selectedApplicantId, setSelectedApplicantId] = useState();
    const [applicants, setApplicants] = useState();
    const [isVoted, setIsVoted] = useState();
    const [nextIsLastInChapterVote, setNextIsLastInChapterVote] = useState();
    const [nextIsLastInBookVote, setNextIsLastInBookVote] = useState();
    const [disabledVote, setDisabledVote] = useState();
    const [applicantView, setApplicantView] = useState();
    const user = useSelector(state => _get(state.app, "user"));
    const openBook = useSelector(state => _get(state.books, "open_book"));
    const dispatch = useDispatch();

    useEffect(() => {
        const id = _get(match, "params.id");
        if (id) {
            get_book(dispatch, id)
        }
        else {
            setError("Книга не найдена");
        }

        return () => dispatch({type: booksActions.SET_BOOK, open_book: null});
    }, []);

    useEffect(() => {
        if (openBook && openBook.status === "in_work" && openBook.participants.find(i => i === user.id)) {
            openBook.last_section = getLastSection(openBook);
            const status = translateStatusSection(openBook);
            if (status.status === "in_work") {
                getDraftSection(openBook.last_section.id);
            }
            if (status.status === "vote") {
                getApplicantsOnSection(openBook.last_section.id);
                getExistUserVote(openBook.last_section.id);
            }
        }

        if (openBook && openBook.participants.find(i => i === user.id)) {
            openBook.last_section = getLastSection(openBook);
            const statusNew = translateStatusSection(openBook);
            if (statusNew.status === "vote") {
                getApplicantsOnSection(openBook.last_section.id);
                getExistUserVote(openBook.last_section.id);
            }
        }
    }, [openBook]);

    if (error)
        return <p>{error}</p>;

    if (!openBook)
        return null;

    const getApplicantsOnSection = async id_section => {
        const applicants = await get_applicants_on_section(id_section);
        setApplicants(applicants);
    };

    const getDraftSection = async id_section => {
        const draft_section = await get_draft_section(id_section);
        if (draft_section) {
            setDraftSection(draft_section);
            setValue(draft_section.text);
            setNextIsLastInBook(draft_section.next_is_last_in_book);
            setNextIsLastInChapter(draft_section.next_is_last_in_chapter);
        }
    };

    const onChangeValueText = (value, disabledMax) => {
        setValue(value);
        setDisabled(disabledMax);
    };

    const saveDraft = async () => {
        const id_section = getLastSection(openBook).id;
        setDisabled(true);
        const data = {
            id_section,
            text: value,
            next_is_last_in_book: nextIsLastInBook,
            next_is_last_in_chapter: nextIsLastInChapter
        };
        //Создаем запись в кандидатах
        if (!draftSection) {
            try {
                await create_draft_section(data);
                return toast.success("Изменения сохранены");
            }
            catch (error) {
                if (error.response.data.msg === "vote start") {
                    await get_book(dispatch, match.params.id);
                }
                setDisabled(false);
                return toast.error(error.response.data.msgUser);
            }
        }
        //Обновляем черновик
        else {
            try {
                await update_draft_section(data);
                return toast.success("Изменения сохранены");
            }
            catch(error) {
                if (error.response.data.msg === "vote start") {
                    await get_book(dispatch, match.params.id);
                }
                setDisabled(false);
                return toast.error(error.response.data.msgUser);
            }
        }
    };

    const sendToVote = async () => {
        const id_section = getLastSection(openBook).id;
        setDisabled(true);
        const data = {
            id_section,
            text: value,
            next_is_last_in_book: nextIsLastInBook,
            next_is_last_in_chapter: nextIsLastInChapter
        };
        try {
            await send_applicant(data);
            toast.success("Ваш вариант отправлен на голосование");
            await get_book(dispatch, match.params.id);
            await getDraftSection(id_section);
            setDisabled(false);
        }
        catch (error) {
            if (error.response.data.msg === "vote start") {
                await get_book(dispatch, match.params.id);
            }
            setDisabled(false);
            return toast.error(error.response.data.msgUser);
        }
    };

    const renderTextEditor = () => {
        const disabledInputs = draftSection ? draftSection.status === "finished" : false;
        return (
            <>
                <WysiwygInput onChange={onChangeValueText}
                              value={value}
                              disabled={disabled || disabledInputs}
                              maxLenght={2000}
                              backgroundColor={"#fff"}
                              placeholder={"Введите текст секции"}/>
                <ButtonWrapper>
                    <Container>
                        {
                            !openBook.last_section.is_last_in_chapter &&
                            !openBook.last_section.is_last_in_book &&
                            <>
                                <StyledCheckbox label={"Следующая секция последняя в главе"}
                                                value={nextIsLastInChapter}
                                                disabled={disabled || disabledInputs}
                                                onChange={value =>  {
                                                    setNextIsLastInChapter(value);
                                                    setNextIsLastInBook(false);
                                                }}/>
                                <StyledCheckbox label={"Следующая секция последняя в книге"}
                                                value={nextIsLastInBook}
                                                disabled={disabled || disabledInputs}
                                                onChange={value => {
                                                    setNextIsLastInChapter(false);
                                                    setNextIsLastInBook(value);
                                                }}/>
                            </>
                        }
                    </Container>
                    {
                        !disabledInputs &&
                        <Container>
                            <Button title={"Сохранить черновик"}
                                    height="40px"
                                    onClick={saveDraft}
                                    disabled={!value || disabled}
                                    margin="0 16px 0 0"/>
                            <Button title={"Отправить на голосование"}
                                    height="40px"
                                    disabled={!value || disabled}
                                    onClick={sendToVote}
                                    margin="0 0 0 0"/>
                        </Container>
                    }
                </ButtonWrapper>
            </>
        )
    };

    const sendUserVote = async () => {
        setDisabledVote(true);
        const id_section = getLastSection(openBook).id;
        const data = {
            id_applicant: selectedApplicantId,
            id_section,
            next_is_last_in_book: nextIsLastInBookVote,
            next_is_last_in_chapter: nextIsLastInChapterVote
        };
        try {
            await send_vote_result(data);
            toast.success("Ваш голос принят, дождитесь окончания голосования");
            await get_book(dispatch, match.params.id);
            await getExistUserVote(id_section);
            setDisabledVote(false);
        }
        catch(error) {
            if (error.response.data.msg === "vote start") {
                await get_book(dispatch, this.props.match.params.id);
                await getExistUserVote(id_section);
            }
            setDisabledVote(false);
            return toast.error(error.response.data.msgUser);
        }
    };

    const renderVote = () => {
        if (isVoted)
            return <p>Вы уже проголосовали, дождитесь окончания голосования</p>;
        if (!applicants)
            return null;
        if (!applicants.find(i => i.id_user === user.id))
            return <p>В голосовании учавствуют только предложившие свой вариант пользователи</p>;

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
                                                  onClick={() => setApplicantView({applicantView: {applicant, number: i+1}})}>
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
                    !openBook.last_section.is_last_in_book &&
                    !openBook.last_section.is_last_in_chapter &&
                    showQuestionLastInChapter &&
                    <QuestionWrapper>
                        <p>Участники предлагают завершить главу следующей секцией, вы согласны?</p>
                        <OptionsWrapper>
                            <StyledCheckbox label={"Согласен"}
                                            value={nextIsLastInChapterVote}
                                            disabled={disabledVote}
                                            onChange={() => nextIsLastInChapterVote(true)}/>
                            <StyledCheckbox label={"Не согласен"}
                                            value={!nextIsLastInChapterVote}
                                            disabled={disabledVote}
                                            onChange={() =>setNextIsLastInChapterVote(false)}/>
                        </OptionsWrapper>
                    </QuestionWrapper>
                }
                {
                    !openBook.last_section.is_last_in_book &&
                    !openBook.last_section.is_last_in_chapter &&
                    showQuestionLastInBook &&
                    <QuestionWrapper>
                        <p>Участники предлагают завершить книгу следующей секцией, вы согласны?</p>
                        <OptionsWrapper>
                            <StyledCheckbox label={"Согласен"}
                                            value={nextIsLastInBookVote}
                                            disabled={disabledVote}
                                            onChange={() => setNextIsLastInBookVote(true)}/>
                            <StyledCheckbox label={"Не согласен"}
                                            value={!nextIsLastInBookVote}
                                            disabled={disabledVote}
                                            onChange={() => setNextIsLastInBookVote(false)}/>
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
                                    onClick={sendUserVote}
                                    margin="0 0 0 0"/>
                        </Container>
                    </ButtonWrapper>
                }
            </ApplicantsContainer>
        );
    };

    const getExistUserVote = async (id_section) => {
        const result = await get_user_vote_from_section(id_section);
        setIsVoted(result.isVoted);
    };

    const user_is_participant = _get(openBook, "participants",[]).find(i => i === user.id);
    openBook.last_section = getLastSection(openBook);
    const status = translateStatusSection(openBook);
    const isLiked = openBook.likes.indexOf(user.id) > -1;

    const setLiked = async isLiked => {
        if (disabled) return null;
        setDisabledVote(true);
        isLiked ? await remove_like(dispatch, openBook.id) : await create_like(dispatch, openBook.id);
        setDisabledVote(false);
    };

    const onSelectApplicantView = id => {
        setApplicantView(id);
        setSelectedApplicantId(applicantView.applicant.id);
    };

    return (
        <Page height={"calc(100vh - 49px)"}>
            <BookInfo>
                <Column>
                    <Text><span>Название: </span>{openBook.name} </Text>
                    <Text><span>Возрастное ограничение: </span>{openBook.age_rating}</Text>
                    <Text><span>Жанры: </span>{openBook.genres.join(", ")}</Text>
                </Column>
                <Column>
                    <Text><span>Статус: </span>{status.title}</Text>
                    <Text><span>Срок: </span>{status.timeout.format("DD.MM.YYYY HH:mm")}</Text>
                </Column>
                <LikedIconWrapper onClick={() => setLiked(isLiked)}>
                    <CountLikesText>{openBook.likes.length}</CountLikesText>
                    <Heart color={isLiked ? "red" : "black"}/>
                </LikedIconWrapper>
            </BookInfo>
            <Title>Содержание</Title>
            <ContentWrapper>
                <WysiwygInput value={generateBookHtml(openBook)}
                              viewer={true}/>
            </ContentWrapper>
            {
                user_is_participant &&
                openBook.status === "in_work" &&
                status.status === "in_work" &&
                renderTextEditor(openBook)
            }
            {
                user_is_participant &&
                openBook.status === "in_work" &&
                status.status === "vote" &&
                renderVote(openBook)
            }
            {renderApplicantView(applicantView, onSelectApplicantView, setApplicantView)}
        </Page>
    )
};

BookPage.propTypes = {
    match: PropTypes.any,
};

const renderApplicantView = (applicantView, onSelected, setApplicantView) => {
    if (!applicantView)
        return null;

    return (
        <Popup title={`Вариант №${applicantView.number}`}
               onClose={() => setApplicantView(null)}
               width={"600px"}
               listenEscForClose={true}
               buttons={<Button title={"Выбрать этот вариант"}
                                height={"40px"}
                                onClick={() => onSelected(applicantView.applicant.id)}/>}>
            <WysiwygInput value={applicantView.applicant.text}
                          height={"auto"}
                          viewer={true}/>
        </Popup>
    )
};

const generateBookHtml = (openBook) => {
    const chapters = _orderBy(openBook.chapters, i => i.number);
    let bookText = '';
    chapters.map(chapter => {
        chapter.sections = _orderBy(chapter.sections, i => i.number);
        bookText += `<p style="text-align:center;"><span style="font-size: 18px;">Глава ${chapter.number}</span></p>`;
        chapter.sections.map(section => section.text ? bookText += `${section.text}` : "");
    });
    return bookText;
};
