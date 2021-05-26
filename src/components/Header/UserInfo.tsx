import React from "react";
import styled from "styled-components";
import _get from "lodash/get";
import {useAppSelector} from "../../store/hooks";
import {User} from "../../Types/Types";

//region Styled
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px;
`;

const IconAvatarContainer = styled.div`
    background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
    width: 32px;
    height: 32px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
`;

const Name = styled.div`
    font-size: 14px;
    display: flex;
    color: #000;
    margin-left: 8px;
`;
//endregion

const UserInfo = () => {
    const user = useAppSelector<User>(state => _get(state.app, "user"));
    if (!user) return null;

    return (
        <Wrapper>
            <IconAvatarContainer>{user.nickname.substring(0, 1)}</IconAvatarContainer>
            <Name>{user.nickname}</Name>
        </Wrapper>
    )
};

export default UserInfo;