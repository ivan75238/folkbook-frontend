import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {connect} from "react-redux";
import UserInfo from "components/Header/UserInfo";
import Button from "components/Elements/Button";
import {API} from "components/API";
import {appActions} from "reducers/actions";
import {toast} from "react-toastify";

//region Styled
const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
`;
//endregion

@connect(() => ({}))
class Header extends PureComponent {

    onClickLogout = () => {
        const {dispatch} = this.props;
        API.USER.LOGOUT()
            .then(() => {
                dispatch({type: appActions.SET_AUTH_VALUE, auth: false});
                dispatch({type: appActions.SET_AUTH_DATA, user: null});
            })
            .catch(error => {
                toast.error(error.response.data.msgUser);
            });
    };

    render() {
        return (
            <Wrapper>
                <UserInfo/>
                <Button title={"Выход"}
                        height="40px"
                        onClick={this.onClickLogout}/>
            </Wrapper>
        )
    }
}

Header.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
};

export default Header;