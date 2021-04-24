import React, {PureComponent} from "react";
import {Route, Switch} from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import _get from "lodash/get";
import {Paths} from "../Paths";
import MainPage from "components/Page/Main/MainPage";
import Header from "components/Header/Header";
import BookPage from "components/Page/Book/BookPage";
import AllBook from "components/Page/AllBook/AllBook";

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

@connect(state => ({
    user: _get(state.app, "user"),
}))
class Main extends PureComponent {
    render() {
        return (
            <MainWrapper>
                <Header/>
                <PageInnerContainer>
                    <Switch>
                        <Route exact path={Paths.books.all.mask()} render={props => <AllBook {...props}/>}/>
                        <Route exact path={Paths.books.book.mask()} render={props => <BookPage {...props}/>}/>

                        <Route exact path={Paths.main.list.mask()} render={props => <MainPage {...props}/>}/>
                    </Switch>
                </PageInnerContainer>
            </MainWrapper>
        )
    }
}

Main.propTypes = {
    user: PropTypes.object,
};

export default Main;
