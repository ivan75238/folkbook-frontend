import React from "react";
import {Route, Switch} from "react-router-dom";
import styled from "styled-components";
import {Paths} from "../Paths";
import MainPage from "components/Page/Main/MainPage";
import {Header} from "components/Header/Header";
import {BookPage} from "components/Page/Book/BookPage";
import {AllBook} from "components/Page/AllBook/AllBook";
import MyBooks from "components/Page/MyBooks/MyBooks";

//region Styled
const MainWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

const PageInnerContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow-y: auto;
`;
//endregion

export const Main = () => {
    return (
        <MainWrapper>
            <Header/>
            <PageInnerContainer>
                <Switch>
                    <Route exact path={Paths.books.all.mask()} component={AllBook}/>
                    <Route exact path={Paths.books.book.mask()} component={BookPage}/>

                    <Route exact path={Paths.liked_books.list.mask()} render={props => <MyBooks {...props}/>}/>

                    <Route exact path={Paths.main.list.mask()} render={props => <MainPage {...props}/>}/>
                </Switch>
            </PageInnerContainer>
        </MainWrapper>
    )
};
