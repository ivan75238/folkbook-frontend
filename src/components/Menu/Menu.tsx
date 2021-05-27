import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Items} from "./Items";
import { useHistory } from "react-router-dom";
import {API} from "../API";
import {appActions} from "../../reducers/actions";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../store/hooks";

//region Types
type WrapperProps = {
    openMenu: boolean
}

type ItemProps = {
    isActive?: boolean
}

type Props = WrapperProps & {
    closeMenu: () => void
}
//endregion

//region Styled
const Wrapper = styled.div<WrapperProps>`
    position: fixed;
    z-index: 1000;
    width: 240px;
    height: calc(100% - 48px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background: #fff;
    bottom: 0;
    right: ${props => props.openMenu ? "0" : "-400px"};
    box-shadow: 0 10px 24px rgb(0 0 0 / 10%);
    transition: right .3s ease-in-out;
`;

const MenuWrapper = styled.div`
    width: 100%;
`;

const Item = styled.div<ItemProps>`
    width: 100%;
    height: 40px;
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    
    ${props => props.isActive && `
        background-color: #EBECF0;
        color: #42526E;    
    `}
    
    :hover {
        background-color: #EBECF0;
        color: #42526E;
    }
`;
//endregion

export const Menu = ({openMenu, closeMenu}: Props) => {
    const [activeMenuId, setActiveMenuId] = useState<number>(0);
    const itemsTop = Items.filter(i => i.id < 100);
    const itemsBottom = Items.filter(i => i.id > 100);
    const history = useHistory();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const onLocationChange = () => {
            const pathname = window.location.hash.split('/');
            const findMenuItem = Items.find(i => {
                const pathParsed = i.path.split('/');
                if (pathname.findIndex(j => j === pathParsed[1]) > -1)
                    return i;
            });
            setActiveMenuId(findMenuItem ? findMenuItem.id : -1);
        };
        return history.listen(onLocationChange);
    });

    const openPage = (path: string) => {
        history.push(path);
        closeMenu();
    };

    const onClickLogout = async () => {
        try {
            await API.USER.LOGOUT();
            dispatch({type: appActions.SET_AUTH_VALUE, auth: false});
            dispatch({type: appActions.SET_AUTH_DATA, user: null});
        }
        catch(error) {
            toast.error(error.response.data.msgUser);
        }
    };

    return(
        <Wrapper openMenu={openMenu}>
            <MenuWrapper>
                {
                    itemsTop.map((item, i) => {
                        return <Item key={i}
                                     isActive={activeMenuId === item.id}
                                     onClick={() => openPage(item.path)}>
                            {item.title}
                        </Item>;
                    })
                }
            </MenuWrapper>
            <MenuWrapper>
                {
                    itemsBottom.map((item, i) => {
                        return <Item key={i}
                                     isActive={activeMenuId === item.id}
                                     onClick={() => openPage(item.path)}>
                            {item.title}
                        </Item>;
                    })
                }
                <Item onClick={onClickLogout}>Выход</Item>
            </MenuWrapper>
        </Wrapper>
    )
};

export default Menu;